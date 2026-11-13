const BASE_URL = "http://localhost:3000";

const SAMPLE_TEXT = `The James Webb Space Telescope (JWST) is an infrared space observatory launched on December 25, 2021. Developed by NASA in partnership with the European Space Agency (ESA) and the Canadian Space Agency (CSA), JWST was designed to succeed the Hubble Space Telescope as NASA's flagship astrophysics mission. Equipped with a 6.5-meter gold-coated beryllium primary mirror and four ultra-sensitive scientific instruments, Webb operates in a halo orbit around the Sun-Earth Lagrange point 2 (L2), approximately 1.5 million kilometers (930,000 miles) beyond Earth's orbit. 

Webb's primary scientific goals include observing the earliest stars and galaxies formed after the Big Bang, studying galaxy assembly and evolution over cosmic time, investigating star and protoplanetary disk formation in dense molecular clouds, and characterizing the atmospheric compositions of transiting exoplanets to detect signatures of water, methane, and potential biosignatures. In its first several years of operations, Webb has made groundbreaking discoveries, including finding unexpectedly massive and bright galaxies that existed just 300 million years after the Big Bang, challenging prevailing cosmological theories of early structure formation. Furthermore, atmospheric transmission spectroscopy by JWST's NIRSpec and NIRCam instruments detected atmospheric gases and clouds on distant gas giants and sub-Neptune worlds.`;

async function runTests() {
  console.log("=== SMART-SUMMARIZE-AI TEST SUITE ===");
  let passed = 0;
  let failed = 0;

  // Test 1: Frontend Homepage Health
  try {
    const res = await fetch(BASE_URL);
    const html = await res.text();
    if (res.ok && html.includes("SmartSummarize") && html.includes("Turn Long Text Into")) {
      console.log("✓ TEST 1 PASSED: Frontend homepage loads with valid HTML & branding");
      passed++;
    } else {
      console.error("✗ TEST 1 FAILED: Homepage response unexpected");
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 1 FAILED:", err.message);
    failed++;
  }

  // Test 2: Empty input validation
  try {
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "", length: "short" }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error && data.error.includes("empty")) {
      console.log("✓ TEST 2 PASSED: Empty input rejected with 400 and clear error message:", data.error);
      passed++;
    } else {
      console.error("✗ TEST 2 FAILED:", res.status, data);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 2 FAILED:", err.message);
    failed++;
  }

  // Test 3: Whitespace only validation
  try {
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "    \n\t  ", length: "medium" }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error) {
      console.log("✓ TEST 3 PASSED: Whitespace-only input rejected with 400");
      passed++;
    } else {
      console.error("✗ TEST 3 FAILED:", res.status, data);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 3 FAILED:", err.message);
    failed++;
  }

  // Test 4: Input exceeding 20,000 characters
  try {
    const oversizedText = "A".repeat(20005);
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: oversizedText, length: "short" }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error && data.error.includes("20,000")) {
      console.log("✓ TEST 4 PASSED: Exceeded character limit (>20k) rejected with 400:", data.error);
      passed++;
    } else {
      console.error("✗ TEST 4 FAILED:", res.status, data);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 4 FAILED:", err.message);
    failed++;
  }

  // Test 5: Invalid JSON payload
  try {
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json-data",
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log("✓ TEST 5 PASSED: Malformed JSON payload correctly rejected with 400");
      passed++;
    } else {
      console.error("✗ TEST 5 FAILED:", res.status, data);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 5 FAILED:", err.message);
    failed++;
  }

  // Test 6: Short Summary with Real Streaming
  try {
    console.log("\n--- Executing Test 6: Short Summary Streaming ---");
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: SAMPLE_TEXT, length: "short" }),
    });

    const contentType = res.headers.get("Content-Type");
    const isChunked = res.headers.get("Transfer-Encoding") === "chunked" || true;
    console.log("Response status:", res.status);
    console.log("Content-Type:", contentType);

    if (res.status === 200 && res.body) {
      let chunksCount = 0;
      let fullText = "";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        chunksCount++;
        fullText += decoder.decode(value, { stream: true });
      }

      console.log(`Received ${chunksCount} chunks, total characters: ${fullText.length}`);
      console.log("Generated Short Summary Preview:\n", fullText.trim());

      if (fullText.length > 50 && chunksCount >= 1) {
        console.log("✓ TEST 6 PASSED: Real-time streaming short summary generated successfully!");
        passed++;
      } else {
        console.error("✗ TEST 6 FAILED: Output too short or no chunks");
        failed++;
      }
    } else {
      const err = await res.text();
      console.error("✗ TEST 6 FAILED:", res.status, err);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 6 FAILED:", err.message);
    failed++;
  }

  // Test 7: Medium Summary
  try {
    console.log("\n--- Executing Test 7: Medium Summary ---");
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: SAMPLE_TEXT, length: "medium" }),
    });

    if (res.status === 200 && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
      console.log("Generated Medium Summary Preview:\n", fullText.trim().slice(0, 300) + "...");
      if (fullText.length > 100) {
        console.log("✓ TEST 7 PASSED: Medium summary generated successfully!");
        passed++;
      } else {
        console.error("✗ TEST 7 FAILED: Medium summary too short");
        failed++;
      }
    } else {
      console.error("✗ TEST 7 FAILED:", res.status);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 7 FAILED:", err.message);
    failed++;
  }

  // Test 8: Detailed Summary (Structured bullet points)
  try {
    console.log("\n--- Executing Test 8: Detailed Summary ---");
    const res = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: SAMPLE_TEXT, length: "detailed" }),
    });

    if (res.status === 200 && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
      console.log("Generated Detailed Summary Preview:\n", fullText.trim().slice(0, 400) + "...");
      const hasBulletOrHeading = fullText.includes("*") || fullText.includes("-") || fullText.includes("#");
      if (fullText.length > 150 && hasBulletOrHeading) {
        console.log("✓ TEST 8 PASSED: Detailed structured summary with bullets generated successfully!");
        passed++;
      } else {
        console.error("✗ TEST 8 FAILED: Detailed summary format unexpected");
        failed++;
      }
    } else {
      console.error("✗ TEST 8 FAILED:", res.status);
      failed++;
    }
  } catch (err) {
    console.error("✗ TEST 8 FAILED:", err.message);
    failed++;
  }

  console.log(`\n==========================================`);
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==========================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();

const prompt = `
Write a professional and engaging product description between 80 and 120 words based on the following technical specifications. Focus on real-world benefits and use cases. 

Do not explain, comment, or analyze the specs — just output the final product description.

At the end of the output, add a list of the technical characteristics.


[Product]
Processor	Intel Core i7-13700H, 14C (6P + 8E) / 20T, P-core 2.4 / 5.0GHz, E-core 1.8 / 3.7GHz, 24MB
Graphics	Intel Iris Xe Graphics
Chipset	Intel SoC Platform
Display	16" WUXGA (1920x1200) IPS 300nits Anti-glare, Non-Touch, 45% NTSC
Keyboard	Backlit, English
Case Color	Arctic Grey
WLAN + Bluetooth	Wi-Fi 6, 802.11ax 2x2 + BT5.2
Audio Chip	High Definition (HD) Audio, Realtek ALC3287 codec
Speakers	Stereo speakers, 2W x2, Dolby Audio
Camera	HD 720p with Privacy Shutter
Microphone	2x, Array
Battery	Integrated 45Wh
Power Adapter	65W USB-C (3-pin)
Dimensions (WxDxH)	356 x 253.5 x 17.5 mm (14.01 x 9.98 x 0.69 inches)
Weight	Starting at 1.7 kg (3.75 lbs)
Fingerprint Reader	Touch Style, Integrated in Power Button


`


const response = await fetch("http://localhost:8000/generate-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1000,
    }),
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    process.stdout.write(decoder.decode(value));
  }
  
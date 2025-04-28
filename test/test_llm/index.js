const prompt = `
Receive [Product] as input to make an ordered list of the product's features
create [Use Cases]
create [Description]
create [Specifications]
create [Summary]
focus on real-world benefits and use cases
create a beatiful list with the technical characteristics
don't say what you have to do or are doing
do not explain or describe what you are doing
just output the final description, no introductions

[Product]
Dual LED
Get a natural, realistic picture and accurate contrast that adapts automatically to match your content with our innovative backlight technology.

100% Color Volume with Quantum Dot
Take in breathtaking color that stays true at any level of brightness. Marvel as your TV transforms light into over a billion beautiful shades.¹

Quantum Processor Lite with 4K Upscaling
Automatically transform your content into 4K and improve your sound. Our processor enhances each pixel, regardless of the source so you get great visuals and audio.

Motion Xcelerator
Watch your content smoothly while experiencing less lag and blur. It improves motion between frames so you have a seamless picture.

Object Tracking Sound Lite
You’ll hear 3D surround sound that follows the movement on screen using our incredible virtual top channel audio putting you right in the middle of the car chase, stampede or party scene.

Quantum HDR
View a range of color, contrast and detail. Vibrant imagery brings full power to the picture.

AirSlim
This TV blends right into your wall with a slim design. It brings clutter free minimalism to the room without distracting you from what you watch.

Samsung Tizen OS
Stream your favorite shows. Play games. Work out with a trainer. Do all you enjoy with Smart TV Powered by Tizen. Discover your must have apps and streaming services all just a few clicks away.²

PANTONE Validated
Enjoy color validated by industry leading experts at Pantone, so that images on the screen look as incredible as they do in real life. Every hue, tint and skin tone offers a more accurate and beautiful picture.

Gaming Hub
Where gaming comes together. Stream your favorite games right from your TV. No console required. You’ll also get recommendations on what to play next, based on what you like.³

TV Speakers and Soundbar in Sync
Only Samsung gives you the power to unlock incredible when you pair your TV with a soundbar. With Q-Symphony, your TV speakers paired with Q-Series and S-Series soundbar operate as one. Together, they can optimize all the channels to bring you our most powerful sound experience ⁴

`


const response = await fetch("http://localhost:8002/api/llm/product-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: prompt
    }),
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    process.stdout.write(decoder.decode(value));
  }
  
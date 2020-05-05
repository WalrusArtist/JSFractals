export default function sketch(p){
    let canvas;
    let minval = -0.5;
    let maxval = 0.5;
    let minSlider;
    let maxSlider;
    let frDiv;
    const width = 1000;
    const height = 500;
    

    p.setup = () => {
      canvas =   p.createCanvas(width, height);
      p.pixelDensity(1);
    
      minSlider = p.createSlider(-2.5, 0, -2.5, 0.01);
      maxSlider = p.createSlider(0, 2.5, 2.5, 0.01);
    
      frDiv = p.createDiv('');
    }

    p.draw = () => {
        var maxiterations = 35;

        p.loadPixels();
        for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
            var a = p.map(x, 0, width, minSlider.value(), maxSlider.value());
            var b = p.map(y, 0, height, minSlider.value(), maxSlider.value());
      
            var ca = a;
            var cb = b;
      
            var n = 0;
      
            while (n < maxiterations) {
              var aa = a * a - b * b;
              var bb = 2 * a * b;
              a = aa + ca;
              b = bb + cb;
              if (a * a + b * b > 16) {
                break;
              }
              n++;
            }
      
            var bright = p.map(n, 0, maxiterations, 0, 1);
            bright = p.map(p.sqrt(bright), 0, 1, 0, 255);
      
            if (n == maxiterations) {
              bright = 0;
            }
      
            var pix = (x + y * width) * 4;
            p.pixels[pix + 0] = bright;
            p.pixels[pix + 1] = bright;
            p.pixels[pix + 2] = bright;
            p.pixels[pix + 3] = 255;
          }
        }
        p.updatePixels();
      
        frDiv.html(p.floor(p.frameRate()));
      }
}
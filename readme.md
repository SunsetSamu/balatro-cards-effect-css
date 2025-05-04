![preview_image](https://files.catbox.moe/mxgyge.png)

# Balatro Card Effect Recreation

This project recreates an interactive card effect using HTML, CSS, and JavaScript. Each card is configured individually and reacts to mouse movements and hover events. The project uses data attributes to allow customization of images and styles for multiple cards.

## How It Works

- **HTML Structure:**  
  The main element is a container (`.item-container`) that holds three main elements:
  - `.card`: The visual card itself.
  - `.overlay`: An overlay that appears on hover.
  - `.shadow`: A shadow element to give depth.

- **Data Attributes:**  
  Each container uses data attributes to configure:
  - `data-card-src`: The default background image for the card.
  - `data-hover-src`: The image shown when hovering (optional).
  - `data-overlay-src`: The overlay image (optional).

- **CSS:**  
  The CSS is sectioned and includes global styles, container styles, and specific styles for the card, overlay, and shadow. This makes it easy to update or override styles for individual elements if needed.

- **JavaScript:**  
  A single script applies an animation effect to each `.item-container`. It uses event listeners (`mouseover`, `mouseout`, and `mousemove`) to modify the transform properties of each element and create the dynamic effect. Each card gets its own effect instance based on its configuration.

## How to Use

1. **Clone or Download:**  
   Get a copy of the project files to your local machine.

2. **Customize Cards:**  
   In the HTML file, duplicate the `.item-container` block to add more cards. Configure each card using:
   - `data-card-src` for the default image.
   - `data-hover-src` for the hover image.
   - `data-overlay-src` for the overlay image.

   Example:
   ```html
   <div class="item-container" data-card-src="default-image-url.png" data-hover-src="hover-image-url.jpg" data-overlay-src="overlay-image-url.png">
       <div class="overlay"></div>
       <div class="card" style="background-position: center; background-size: 180px;"></div>
       <div class="shadow"></div>
   </div>
   ```

3. **Customize Styles:**  
   - Use the CSS sections to adjust the style of the cards, overlay, and shadows.
   - Inline styles can be applied in the `.card` or modified in the CSS to suit your design.

4. **View the Project:**  
   Open the HTML file in your browser. When you hover over a card, you will see the interactive effect:
   - The card image changes (if a hover image is provided).
   - The overlay appears.
   - The card and shadow animate based on mouse movement.

## Requirements

- Modern web browser with support for CSS3 and JavaScript.
- No additional frameworks or libraries are required.

## Customization

- **Images & Background:**  
  You can easily swap out images by updating the corresponding data attributes.
- **Animations:**  
  Modify the animation parameters (such as `NORMAL_SPEED`, `SLOW_SPEED`, or `constrain`) in the JavaScript section to adjust the effect intensity.
- **Responsive Design:**  
  The container is designed to be centered on the viewport. You can modify the CSS if you wish to adjust the layout.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

Inspired by various creative card effects found on the web. The structure and effect implementation are intended as a customizable template for your projects.
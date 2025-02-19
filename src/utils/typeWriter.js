export function typeWriter(element, text, speed = 30,typeTracker) {
    let index = 0;
    
    element.value = '';

    typeTracker.value = true;
    
    function type() {
      if (index < text.length) {
        if (typeTracker.value === false) {
          return;
        }
        element.value += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }else {
        typeTracker.value = false;
      }
    }
    
    type();
  }
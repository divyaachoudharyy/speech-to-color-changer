if('webkitSpeechRecognition' in window)
{
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var colors = [ 'Aqua' , 'Azure' , 'Beige', 'Bisque', 'Black', 'Blue', 'Brown', 'Chocolate', 'Coral', 'Crimson', 'Cyan', 'Fuchsia', 'Ghostwhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'Lime', 'Linen', 'Magenta', 'Maroon', 'Moccasin', 'Navy', 'Olive', 'Orange', 'Orchid', 'Peru', 'Pink', 'Plum', 'Purple', 'Red', 'Salmon', 'Sienna', 'Silver', 'Snow', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'White', 'Yellow'];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('html');
    var hints = document.querySelector('.hints');

    var colorHTML= '';
    colors.forEach(function(v, i, a){
        console.log(v, i);
        colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
    });
    hints.innerHTML = colorHTML + '.';

   document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
    }

    recognition.onresult = function(event) {
        var color = event.results[0][0].transcript;
        diagnostic.textContent = 'Result received: ' + color + '.';
        bg.style.backgroundColor = color;
        console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function() {
      console.log('Stop recieving the audio')
        recognition.stop();
    }

    recognition.onnomatch = function(event) {
        diagnostic.textContent = "I didn't recognise that color.";
    }

    recognition.onerror = function(event) {
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    }

}
else{
  var diagnostic = document.querySelector('.output');
  diagnostic.textContent = "Oops! Your browser does not support this API. Please try to use some other browser."
}
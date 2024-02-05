const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : 
        "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        // Konuşup konuşmadığını kontrol eder
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        // Metin uzunsa, "Devam Et" ve "Duraklat işlevi ekler
        if(textarea.value.length > 80){
            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "DÖNÜŞTÜR"
                }else{}
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Konuşmayı Duraklat"
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Konuşmaya Devam Et"
            }
        }else{
            speechBtn.innerText = "DÖNÜŞTÜR";
        }
    }
});

var keypad = {
    keynums_normal : ['`','1','2','3','4','5','6','7','8','9','0','-','=','backspace','tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','caps lock','a','s','d','f','g','h','j','k','l',';','\'','enter','shift','z','x','c','v','b','n','m',',','.','/','shift','ctrl','fn','win','alt','space','한/영'],
    keynums_shift : ['`','!','@','#','$','%','^','&','*','(',')','_','+','backspace','tab','Q','W','E','R','T','Y','U','I','O','P','{','}','|','caps lock','A','S','D','F','G','H','J','K','L',':','\"','enter','shift','Z','X','C','V','B','N','M','<','>','?','shift','ctrl','fn','win','alt','space','한/영'],
    shift : false,
    capsLock : false,
    keyboard : '',
    keypad : '',
    target : '',
    wrapper : '',
    selectionStart : 0,
    selectionEnd : 0,
    initKeyboard : function(){
        this.keyboard = document.createElement('div');
        this.keyboard.id = 'keyboard';
        this.keyboard.style.width = '100%';
        this.keyboard.style.bottom = '0px';
        this.keyboard.style.transition = 'transform 0.7s';
    },
    initKeypad : function(){
        this.keypad = document.createElement('div');
        this.keypad.id = 'keypad';
        this.keypad.style.display = 'flex';
        this.keypad.style.flexWrap = 'wrap';
        this.keypad.style.width = '100%';
        this.keypad.style.margin = 'auto';


        this.keyboard.appendChild(this.keypad);

    },
    initKeyBtn : function(){
        var keynums = this.shift ? this.keynums_shift : this.keynums_normal
        for(var i =0; i<keynums.length; i++){
            var num = keynums[i]
            var btn = document.createElement('div');
            btn.innerText = num;
            btn.style.boxSizing = 'border-box';
            btn.style.border = '1px solid black';
            btn.style.width = 'calc(90% / 13)';
            btn.style.wordBreak =  'break-all';
            btn.style.fontSize = '70%';
            btn.style.paddingTop = '7px';
            btn.style.paddingLeft = '10px';
            btn.style.paddingBottom = 'calc((90% / 17) - 10px)';
            btn.style.cursor = 'pointer';
            btn.style.msUserSelect = 'none';
            btn.style.userSelect = 'none;'
            if(
                num == 'backspace' || 
                num == 'tab' ||
                num == 'ctrl' ||
                num == 'alt'
            ){
                btn.style.width = '10%';
            }
            if(
                num == 'caps lock' || 
                num == 'enter'
            ){
                btn.style.width = 'calc(( 100% - (90% / 13) * 11) /2 )';
            }
            if(
                num == 'shift'
            ){
                btn.style.width = 'calc(( 100% - (90% / 13) * 10) /2 )';
            }
            if(
                num == 'space'
            ){
                btn.style.width = '30%';
            }
            
            btn.addEventListener('click', this.keyBtnClick.bind(this));

            this.keypad.appendChild(btn);
        }
    },
    keyBtnClick : function(e){
        this.target.selectionStart = this.selectionStart;
        this.target.selectionEnd = this.selectionEnd;

        var btn = e.currentTarget;
        var text = '';

        switch (btn.innerText) {
            case 'backspace':
                text='';
                break;
            case 'tab':
            case 'enter':
                break;
            case 'caps lock':
                this.fnCapsLock();
                break;
            case 'ctrl':
            case 'fn':
            case 'win':
            case 'alt':
            case '한/영':
                break;
            case 'space':
                text = ' ';
                break;
            case 'shift':
                this.fnShift();
                break;
            default:
                text = btn.innerText
                if(this.shift && !this.capsLock){
                    this.fnShift();
                }
                if(this.capsLock && !this.shift){
                    this.fnShift();
                }
                break;
        }
        // this.target.value = this.target.value + text;
        if(text==''){ // 삭제시
            if(this.target.selectionStart == this.target.selectionEnd){
                if(this.selectionStart > 0) this.selectionStart--;
                this.target.selectionStart = this.selectionStart;
            }
        } else {
            this.selectionStart++;
        }
        if(this.target.setRangeText){
            this.target.setRangeText(text);
        } else {
            var str = this.target.value;
            var str1 = this.target.value.substring(0,this.target.selectionStart);
            var str2 = this.target.value.substring(this.target.selectionEnd, str.length);
            this.target.value = str1 + text + str2;
        }
        this.target.focus();
        this.target.selectionStart = this.selectionStart;
        this.target.selectionEnd = this.selectionEnd = this.selectionStart;
    },
    openKeypad : function(wrap, tar){
        if(!this.keyboard){ // 키보드가 없으면 생성
            this.initKeyboard();
        }
        if(!this.keypad){ // 키패드가 없으면 생성
            this.initKeypad();
            this.initKeyBtn();
        }

        if(arguments.length == 2){ // 파라미터가 둘이면 wrapper와 타겟 설정
            this.wrapper = wrap;
            this.target = tar;
            this.keyboard.style.position = 'absolute';
            this.wrapper.style.position = 'relative';
        }
        if(arguments.length == 1){ // 파라미터가 하나면 wrapper는 body, 타겟 설정
            this.wrapper = document.body;
            this.target = wrap;
            this.keyboard.style.position = 'fixed';
        }

        this.wrapper.appendChild(this.keyboard);

        this.keyboard.style.height = '0px';
        this.keyboard.style.transform = 'unset';

        if(this.keyboard.offsetWidth > 500){ // 키보드 크기가 커지면 키패드 크기 조절
            this.keypad.style.width = 'calc(((100% - 500px) / 2 ) + 500px)';
        }
        this.keyboard.style.transform = 'translateY(-'+this.keypad.offsetHeight+'px)';

        this.selectionStart = this.target.selectionStart;
        this.selectionEnd = this.target.selectionEnd;
        
    },
    fnShift : function(){
        this.shift = !this.shift;
        for(var i=0; i < document.querySelectorAll('#keypad div').length;i++){
            document.querySelectorAll('#keypad div')[i].remove();
        }
        this.initKeyBtn();
    },
    fnCapsLock : function(){
        this.capsLock = !this.capsLock;
        if(this.capsLock && !this.shift){
            this.fnShift();
        }
        if(!this.capsLock && this.shift){
            this.fnShift();
        }
    },

}      

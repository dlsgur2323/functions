
var keypad = {
    keynums_normal : ['`','1','2','3','4','5','6','7','8','9','0','-','=','backspace','tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','caps lock','a','s','d','f','g','h','j','k','l',';','\'','enter','shift','z','x','c','v','b','n','m',',','.','/','shift','ctrl','fn','win','alt','space','한/영'],
    keynums_shift : ['`','!','@','#','$','%','^','&','*','(',')','_','+','backspace','tab','Q','W','E','R','T','Y','U','I','O','P','{','}','|','caps lock','A','S','D','F','G','H','J','K','L',':','\"','enter','shift','Z','X','C','V','B','N','M','<','>','?','shift','ctrl','fn','win','alt','space','한/영'],
    shift : false,
    capsLock : false,
    keyboard : '',
    keypad : '',
    target : '',
    wrapper : '',
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


        this.keyboard.append(this.keypad);

    },
    initKeyBtn(){
        for(num of this.shift ? this.keynums_shift : this.keynums_normal){
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

            this.keypad.append(btn);
        }
    },
    keyBtnClick(e){
        var btn = e.currentTarget;
        this.target.focus();
        var text = '';
        switch (btn.innerText) {
            case 'backspace':
                this.target.value = this.target.value.substring(0,this.target.value.length-1);
                break;
            case 'tab':
            case 'enter':
            case 'caps lock':
                this.fnCapsLock();
                break;
            case 'ctrl':
            case 'fn':
            case 'win':
            case 'alt':
            case '한/영':
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
        this.target.value = this.target.value + text;
        
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

        this.wrapper.append(this.keyboard);

        this.keyboard.style.height = '0px';
        this.keyboard.style.transform = 'unset';

        if(this.keyboard.offsetWidth > 500){ // 키보드 크기가 커지면 키패드 크기 조절
            this.keypad.style.width = 'calc(((100% - 500px) / 2 ) + 500px)';
        }
        this.keyboard.style.transform = 'translateY(-'+this.keypad.offsetHeight+'px)';

        this.target.focus();

    },
    fnShift : function(){
        this.shift = !this.shift;
        for(i of document.querySelectorAll('#keypad div')){
            i.remove();
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

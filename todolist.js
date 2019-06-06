window.addEventListener('load',function () {
    let tab = document.querySelectorAll('.tab>li');
    let prev = 0;
    let content = document.querySelector('.content');
    let type = 'all';
    let todolist = [
        {
            id:1,content:'端午节要交作业',ctime:'2019/6/4',status:false
        },
        {
            id:2,content:'我不想交作业',ctime:'2019/6/4',status:false
        },
        {
            id:3,content:'企业',ctime:'2019/5/31',status:true
        },
        {
            id:4,content:'需求文档',ctime:'2019/6/4',status:false
        },

    ];
    let str = localStorage.getItem('todolist');
    if (!str){
        saveDate();
        str = localStorage.getItem('todolist')
    }
    todolist = JSON.parse(str);
    tab.forEach(function (elem,index) {
        elem.onclick=function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type = this.getAttribute('type');
            render(filterDate(type));
        }
    });
    tab[0].onclick();


    content.onclick = function (e) {
        let target = e.target;
        let id = target.parentNode.id;
        // console.log(id);
        if (target.nodeName === 'INPUT'){
            // console.log(1);
            let elem = todolist.filter(elem =>elem.id == id)[0];
            elem.status = target.checked;
        }else if (target.nodeName === 'DEL') {
            // console.log(2);
            let index = todolist.findIndex(elem=>elem.id == id);
            // console.log(index);
            todolist.splice(index,1);
        }
        saveDate();
        render(filterDate(type));
    };
    let forms = document.forms[0];
    let textBtn = forms.elements['content'];
    let submitBtn = forms.elements[1];
    submitBtn.onclick = function (e) {
        e.preventDefault();
        let obj = createObj();
        todolist.push(obj);
        forms.reset();
        render(filterDate(type));
        saveDate();
    };
    function saveDate() {
        localStorage.setItem('todolist',JSON.stringify(todolist));
    }



    function createObj() {
        let id = todolist[todolist.length-1].id + 1;
        let content = textBtn.value;
        let ctime = new Date().toLocaleDateString();
        let status = false;
        return{id,content,ctime,status}
    }

    function filterDate(type) {
        let arr=[];
        switch (type) {
            case 'all':
                arr = todolist;
                break;
            case 'done':
                // arr = todolist.filter(elem => elem.status);
                arr = todolist.filter(elem => elem.status);
                break;
            case 'doing':
                arr = todolist.filter(elem => !elem.status);
                break;
        }
        return arr;

    }


    // 渲染
    function render(arr) {
        let html = '';
        arr.forEach(elem =>{
            if (elem.status){
                html +=`
                <li id="${elem.id}">
                    <input type="checkbox" checked> 
                    <p>${elem.content}</p> 
                    <del>X</del>
                    <time>${elem.ctime}</time>
                </li>        
            `;
            } else {
                html += `
                <li id="${elem.id}">
                    <input type="checkbox"> 
                    <p>${elem.content}</p> 
                    <del>X</del>
                    <time>${elem.ctime}</time>
                </li>        
            `;
            }
        })
        content.innerHTML = html;
    }
})
var element = document.getElementById("list")
let todos = []
var ids=0;

String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g,"");
}

function onAreaChange(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13){
        var string = document.getElementById("area-text").value.trim()
        console.log(string)

        if(document.getElementById("area-text").value.trim() == ''){
            alert("You must write something first!!!")
        }else{
            var item = {
                id: ids,
                text: string,
                compelete: false
            }

            ids++
            todos.push(item)
            
            const { task_element } = createElement(item)
            element.append(task_element)

            Save()
        }
	    document.getElementById("area-text").value = ''
        
    }
	
}

/* <div class="task">
        <input type="text"
                value="task 1"
                 disabled>
                <input type="checkbox">
                <div class = "action">
                <button class="material-icons">edit</button>
            <button class="material-icons remove-btn">highlight_off</button>
        </div>
    </div> */

function createElement(item){
    const task_element = document.createElement("div")
    task_element.classList.add("task")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = item.complete

    if(item.compelete){
        task_element.classList.add("compelete")
    }else{
        task_element.classList.remove("compelete")
    }

    const input_task = document.createElement("input")
    input_task.type = "text"
    input_task.setAttribute("disabled", "")
    input_task.value = item.text

    const action = document.createElement("div")
    action.classList.add("action") 

    const edit_button = document.createElement("button")
    edit_button.classList.add("material-icons")
    edit_button.innerText = "edit"

    const remove_button = document.createElement("button")
    remove_button.classList.add("material-icons","remove-btn")
    remove_button.innerText = "highlight_off"

    action.append(edit_button)
    action.append(remove_button)

    task_element.append(input_task)
    task_element.append(checkbox)
    task_element.append(action)

    //Events

    checkbox.addEventListener("change",() =>{
        item.compelete = checkbox.checked    // will return true or false
        
        if(item.compelete){
            task_element.classList.add("compelete")
        }else{
            task_element.classList.remove("compelete")
        }

        Save();
    })
    //for new text
    input_task.addEventListener("input", () =>{
        item.text = input_task.value
    })
    //when click outside box
    input_task.addEventListener("blur", () =>{
        input_task.setAttribute("disabled","")
        Save();
    })
    //clicked edit button
    edit_button.addEventListener("click", () =>{
        input_task.removeAttribute("disabled")
        input_task.focus()
    })
    //clicked remove button
    remove_button.addEventListener("click", () => {
        todos = todos.filter(t => t.id !== item.id)

        task_element.remove()
        Save();
    })

    return { task_element }
}

function Save(){
    const save = JSON.stringify(todos)

    window.localStorage.setItem("saved_tasks",save)
}

function Load(){
    const data = window.localStorage.getItem("saved_tasks")

    if(data){
        todos = JSON.parse(data)
    }
    for(let i=0; i<todos.length; i++){
        const item = todos[i];
        ids = item.id;
        ids++;

        const { task_element } = createElement(item)
        element.append(task_element)
    }
}
Load();

$(document).ready(function() {
    console.log("Executing script.js...");

    const $taskInput = $("#taskInput");
    const $taskList = $("#taskList");
    const $addTaskBtn = $("#addTaskBtn");

    function updateTime() {
        const now = dayjs().format(`dddd, MMMM D, YYYY h:mm:ss A`);
        $("#currentTime").text(now);
    };

    updateTime();

    setInterval(updateTime, 1000);

    async function fetchTasks() {
        const result = await fetch("/api/tasks");
        const tasks = await result.json();
        $taskList.empty();
        tasks.forEach(task => addTaskToDom(task));
    }

    function addTaskToDom(task) {
        const $list = $(`<li class="${task.status}"><span>${task.description}</span></li>`);
        $list.data("id", task.id);

        const $deleteBtn = $(`<button>Delete</delete>`).click(deleteTask);
        $list.append($deleteBtn);
        $list.children("span").click(completeTask);

        $taskList.append($list);
    }

    $addTaskBtn.click(async () => {
        const description = $taskInput.val().trim();
        if (description) {
            const result = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ description }),
            });
            const newTask = await result.json();
            console.log("New Entry:", newTask);
            addTaskToDom(newTask);
            $taskInput.val("");
        }
    });

    async function completeTask(list) {
        const $li = $(list.target).parents("li");
        const taskId = $li.data("id");
        const task = await fetch(`/api/tasks/${taskId}`, { method: "PUT" });
        const taskStatus = (await task.json())[0].status;
        $li.attr("class", taskStatus);
    }

    async function deleteTask(e) {
        e.stopPropagation();
        const $li = $(e.target).parent();
        const taskId = $li.data("id");
        await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
        $li.remove();
    }

    fetchTasks();
});
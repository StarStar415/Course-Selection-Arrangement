function start(){
    selectionClass();
}
function selectionClass(){
    let courseList = document.getElementById('selectionClass');
    $.getJSON("https://raw.githubusercontent.com/StarStar415/Course-Selection-Arrangement/main/lesson.json", function(result){
        $.each(result, function(i, field){
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'course';
            checkbox.value = result[i].lessonNumber;

            const label = document.createElement('label');
            label.textContent = `${result[i].lessonNumber} ${result[i].className} ${result[i].teacher} (${result[i].classTime}) `;
            label.insertBefore(checkbox, label.firstChild);
            courseList.appendChild(label);
            checkbox.addEventListener("change", function() {
                // 如果 checkbox 被勾選
                if (this.checked) {
                    school_timetable();
                }
                else{
                    school_timetable();
                    console.log("取消")
                }
            });
        });
    });
    function school_timetable(){
        console.log("進入")
        // 獲取所有的 checkbox 元素
        const allCheckBox = document.querySelectorAll("input[type='checkbox']");
        // 遍歷所有的 checkbox 元素
        allCheckBox.forEach(function(nowCheckBox) {
            restartTable()
            
            
            // 檢查 checkbox 的狀態
            if (nowCheckBox.checked) {
                console.log("owo")
                $.getJSON("https://raw.githubusercontent.com/StarStar415/Course-Selection-Arrangement/main/lesson.json", function(result){
                    console.log(result)
                    $.each(result, function(i, field){
                            console.log(result[i].lessonNumber);
                            console.log(nowCheckBox.value);
                                if (result[i].lessonNumber == nowCheckBox.value) {
                                    console.log("相同")
                                    console.log(result[i].lessonNumber)
                                    console.log(result[i].className)
                                    console.log(result[i].teacher)
                                    console.log(result[i])
                                    let time = result[i].classTime;
                                    console.log(time)
                                    for(let k = 0 ; k < time.length ; k++){
                                        console.log(time[k])
                                        let nowChooseTime = document.getElementById(time[k]);
                                        console.log(nowChooseTime)
                                        let classString = result[i].lessonNumber +"<br>"+result[i].className+"<br>"+result[i].teacher+"<br>";
                                        nowChooseTime.innerHTML += classString;
                                    }
                                    return false;
                                }
                                
                            });
                    });
            }
        });
    }
    function restartTable(){
        for(let i = 1 ; i < 6 ; i++){
                for(let j = 1 ; j < 15 ; j++){
                    let tmp;
                    if (j<10){
                       tmp = i+"0"+j
                    }
                    else{
                        tmp = i+""+j;
                    }
                    
                    console.log(tmp)
                    let nowChooseTime = document.getElementById(tmp);
                    console.log(nowChooseTime)
                    nowChooseTime.innerHTML="";
                }
            }
    }
}
window.addEventListener("load",start,false);
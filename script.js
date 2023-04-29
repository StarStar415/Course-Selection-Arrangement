function start(){
    selectionClass();
    document.getElementById("exportButton").addEventListener("click", () => {
        // 取得表格元素
        let table = document.getElementById("classTable");
        console.log(table);
        // 建立 PDF 物件
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();

        // 將表格轉換成 PDF，指定 x、y 座標和選項
        doc.html(table, {
            callback: function () {
                doc.save("file.pdf");
                console.log("ouo")
            }
          });
    
        // 下載 PDF 檔案
        //doc.save("table.pdf");
    });
}



// function checkSelect(selectedOption){
//     if (selectedOption.value=="預設")
//         return lessonNumber;
//     if (selectedOption.value=="時間")
//         return classTime;
//     if (selectedOption.value=="老師")
//         return teacher;
//     if (selectedOption.value=="預設")
//         return category;
// }
function selectionClass(){
    let courseList = document.getElementById('selectionClass');
    $.getJSON("https://raw.githubusercontent.com/StarStar415/Course-Selection-Arrangement/main/lesson.json", function(result){
        // let nowChoose = document.getElementById("choose");
        // let NowSelectedOption = nowChoose.selectedOptions;
        // console.log(NowSelectedOption);
        // let nowSelect = checkSelect(NowSelectedOption);
        // console.log(nowSelect);
        // result.sort((a, b) => {
        //     if (a[sortBy] < b[sortBy]) {
        //       return -1;
        //     }
        //     if (a[sortBy] > b[sortBy]) {
        //       return 1;
        //     }
        //     return 0;
        //   });
        $.each(result, function(i, field){
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'course';
            checkbox.value = result[i].lessonNumber+i;

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
                    // console.log("取消")
                }
            });
        });
    });
    function school_timetable(){
        // console.log("進入")
        // 獲取所有的 checkbox 元素
        const allCheckBox = document.querySelectorAll("input[type='checkbox']");
        // 遍歷所有的 checkbox 元素
        allCheckBox.forEach(function(nowCheckBox) {
            restartTable()
            // 檢查 checkbox 的狀態
            if (nowCheckBox.checked) {
                // console.log("owo")
                $.getJSON("https://raw.githubusercontent.com/StarStar415/Course-Selection-Arrangement/main/lesson.json", function(result){
                    // console.log(result)
                    $.each(result, function(i, field){
                            // console.log(result[i].lessonNumber);
                            // console.log(nowCheckBox.value);
                                if (result[i].lessonNumber+i == nowCheckBox.value) {
                                    // console.log("相同")
                                    // console.log(result[i].lessonNumber)
                                    // console.log(result[i].className)
                                    // console.log(result[i].teacher)
                                    // console.log(result[i])
                                    let time = result[i].classTime;
                                    // console.log(time)
                                    for(let k = 0 ; k < time.length ; k++){
                                        // console.log(time[k])
                                        let nowChooseTime = document.getElementById(time[k]);
                                        // console.log(nowChooseTime)
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
                    
                    // console.log(tmp)
                    let nowChooseTime = document.getElementById(tmp);
                    // console.log(nowChooseTime)
                    nowChooseTime.innerHTML="";
                }
            }
    }
}
window.addEventListener("load",start,false);
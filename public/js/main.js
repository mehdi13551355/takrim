
function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll("#menu a");
    const menu = document.getElementById("menu");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("show"); // بستن منو
        });
    });
    });
//     const divs = document.querySelectorAll(".my-div");
//     divs.forEach(div => {
//         div.addEventListener("click", function () {
//             const nameValue = this.getAttribute("name");
//         });
//     });


function moveDiv1() {
    const div1 = document.getElementById("karshnas1");
    div1.classList.toggle("moved");
    document.getElementById("karshnas2").style.display = "none";
     document.getElementById("karshnas3").style.display = "none";
    //  document.getElementById("karshnas3").style.display = "block";
}
function moveDiv2() {
    const div2 = document.getElementById("karshnas2");
    div2.classList.toggle("moved");
    document.getElementById("karshnas1").style.display = "none";
     document.getElementById("karshnas3").style.display = "none";
    //  document.getElementById("karshnas3").style.display = "block";
}
function moveDiv3() {
    const div3 = document.getElementById("karshnas3");
    div3.classList.toggle("moved");
    document.getElementById("karshnas1").style.display = "none";
     document.getElementById("karshnas2").style.display = "none";
    //  document.getElementById("karshnas3").style.display = "block";
}

function loadPage(page) {
    fetch(`/partial/${page}`)
        .then(res => {
            if (!res.ok) throw new Error("صفحه پیدا نشد");
            return res.text();
        })
        .then(html => {
            document.getElementById("content").innerHTML = html;

            // const div1 = document.getElementById("karshnas1");
            // if (div1) {
            //     div1.addEventListener("click", moveDiv);
            //   }
            })
        .catch(err => {
            document.getElementById("content").innerHTML = `<p style="color:blue;">خطا: ${err.message}</p>`;
        });
}


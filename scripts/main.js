let group_members = document.getElementById("grp-members");
let user_input = document.getElementById("input-text");
var members_name = ["hongjoong","jongho","mingi","san","seonghwa","wooyoung","yeosang","yunho"];
var correct_answer;
var serie = -1;
var nb_of_fails = 0;
var img_array = [
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
    ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"]
];

//FUNCTIONS

function pickPhoto() {
    //pick one of the members directory
    var memb_ind = Math.floor(Math.random() * 8); 
    //check if array is != 0
    var array1_index_length = img_array[memb_ind].length;
    while(array1_index_length === 0) {memb_ind = Math.floor(Math.random() * 8); array1_index_length = img_array[memb_ind].length;}
    //we store the correct answer
    var memb_name = members_name[memb_ind];
    correct_answer = members_name[memb_ind];
    //pick the photo index among the unused elements
    var photo = Math.floor(Math.random() * (array1_index_length - 1)); 
    var picked_photo = img_array[memb_ind].splice(photo,1);
    var res = "media/" + memb_name + "/" + picked_photo;
    return res;
}

function serieFinished() {
    return serie === 3;
}

function resetDisplay() {
    img_array = [
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"],
        ["0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"]
    ];

    serie = -1;
    group_members.setAttribute('src','media/blvk.png');
    user_input.style.display = 'none';

    if(nb_of_fails === 0) {
        document.querySelector('h4').textContent = "You got them all, congratz :p";
    } else if(nb_of_fails === 1) {
        document.querySelector('h4').textContent = "You only made 1 mistake, that's pretty good !";
    } else if(nb_of_fails <= 5) {
        document.querySelector('h4').textContent = "You only made " + nb_of_fails + " mistakes, that's pretty good !";
    } else {
        document.querySelector('h4').textContent = "You made more than 5 mistakes, but it's okay, keep trying !";
    }

    document.querySelector('h4').style.display = 'block';

    nb_of_fails = 0;
}

//LISTENERS INIT

group_members.addEventListener('click', function() {
    let mysrc = group_members.getAttribute('src');
    if(mysrc === 'media/blvk.png' && serie === -1) {
        group_members.setAttribute('src', pickPhoto());
        serie = 0;
        document.querySelector('h5').style.display = 'none';
        document.querySelector('h4').style.display = 'none';
        user_input.style.display = 'block';
    }
})

user_input.addEventListener('keypress', function(e) {
    if(e.key == 'Enter' && user_input.value.toLowerCase() === correct_answer) {
        group_members.setAttribute('src', pickPhoto());
        user_input.value = '';
        serie += 1;
    } else if(e.key == 'Enter' && user_input.value.toLowerCase() !== correct_answer) {
        group_members.className += "shk";
        user_input.value = '';
        nb_of_fails += 1;
    }

    if(serieFinished()) {resetDisplay();}
});
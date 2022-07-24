const elUsersList = document.querySelector(".users-list")
const elPostList = document.querySelector(".users-posts")
const elCommentList = document.querySelector(".users-comments")
const elUserTemplate = document.querySelector(".js-user-template").content
const elPostTemplate = document.querySelector(".js-user-posts").content
const elCommentTemplate = document.querySelector(".js-user-comments").content

console.log(elCommentList);

const elUserFragment = document.createDocumentFragment()
const elPostFragment = document.createDocumentFragment()
const elCommentFragment = document.createDocumentFragment()

function renderUser(array, node) {
    node.innerHTML = ""
    array.forEach(user => {
        const newTemp = elUserTemplate.cloneNode(true)
        newTemp.querySelector(".user").dataset.userId = user.id
        newTemp.querySelector(".user__id").textContent = user.id
        newTemp.querySelector(".user__name").textContent = user.username
        newTemp.querySelector(".user__phone").textContent = user.phone
        newTemp.querySelector(".user__phone").href = `tel:${user.phone}`
        newTemp.querySelector(".user__fullname").textContent = user.name
        newTemp.querySelector(".user__email").textContent = user.email
        newTemp.querySelector(".user__email").href = `mailto:${user.email}`
        newTemp.querySelector(".user__adress-inner").textContent = `${user.address.street}  ${user.address.suite} ${user.address.city} ${user.address.zipcode}`
        newTemp.querySelector(".user__adress-link").href = `https://www.google.com/maps/place/${user.address.geo.lat},${user.address.geo.lng}`
        newTemp.querySelector(".user__web-site").textContent = user.website
        newTemp.querySelector(".user__web-site").href = `https://${user.website}`
        newTemp.querySelector(".company__name").textContent = ` ${user.company.name}`
        newTemp.querySelector(".company__mission").textContent = ` ${user.company.catchPhrase}`
        newTemp.querySelector(".company__bs").textContent = ` ${user.company.bs}`



        elUserFragment.appendChild(newTemp)

    });
    node.appendChild(elUserFragment)
}

function renderPosts(array, node) {
    node.innerHTML = ""

    array.forEach((post) => {
        const newTemp = elPostTemplate.cloneNode(true)
        newTemp.querySelector(".post").dataset.postId = post.id
        newTemp.querySelector(".post__title").textContent = post.title
        newTemp.querySelector(".post__body").textContent = post.body
        elPostFragment.appendChild(newTemp)
    })
    node.appendChild(elPostFragment)
}

function renderComments(array, node) {
    node.innerHTML = ""

    array.forEach((comment) => {
        const newTemp = elCommentTemplate.cloneNode(true)
        newTemp.querySelector(".comment").dataset.commentId = comment.id
        newTemp.querySelector(".comment__title").textContent = comment.name
        newTemp.querySelector(".comment__email").textContent = comment.email
        newTemp.querySelector(".comment__email").href = `mailto:${comment.email}`
        newTemp.querySelector(".comment__body").textContent = comment.body
        elCommentFragment.appendChild(newTemp)
    })
    node.appendChild(elCommentFragment)
}

async function getUserData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await (res).json()


    renderUser(data, elUsersList)
}

getUserData()

elUsersList.addEventListener("click", (evt) => {
    if (evt.target.matches(".user")) {
        async function getUserPost() {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await (res).json()

            let finded = data.filter(el => el.userId == evt.target.dataset.userId)

            renderPosts(finded, elPostList)
        }

        getUserPost()
    }
})

elPostList.addEventListener("click", (evt) => {
    if (evt.target.matches(".post")) {

        console.log(evt.target.dataset.postId);
        async function getUserComment() {
            const res = await fetch("https://jsonplaceholder.typicode.com/comments")
            const data = await (res).json()

            let finded = data.filter(el => el.postId == evt.target.dataset.postId)

            renderComments(finded, elCommentList)
        }

        getUserComment()
    }
})
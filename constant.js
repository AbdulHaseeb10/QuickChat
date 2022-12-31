let PORT = process.env.PORT;
let linkHref =`http://localhost:${PORT}/socket.io/socket.io.js`
let linkElement = document.createElement("link");
    linkElement.setAttribute("href",linkHref );
    document.head.appendChild(linkElement);
export default PORT;
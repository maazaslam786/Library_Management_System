import "./footer.css"

function Footer(){
    return(<>
        <footer id="SLfooter">
            <span><b>{new Date().getFullYear()} &copy; StreamLine Library Services Pvt. Limited. All rights reserved</b></span>
            <a href="#">Privacy Policy</a>
            <a href="#">FAQs</a>
        </footer>
    </>)
}

export default Footer
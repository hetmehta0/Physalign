export default function Hamburger(){
    return(
        <div>
            <div className="hamburger-menu">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            
            <style jsx>{`
                .hamburger{
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    flex-flow: column-nowrap;
                    z-index: 10;
                    }
                .burger {
                    width: 2rem;
                    height: 0.25rem;
                    background-color: #333;
                    margin: 0.3rem 0;
                    border-radius: 10px;
                    transition: all 0.3s linear;
                }
            `}</style>
        </div>
    )
}
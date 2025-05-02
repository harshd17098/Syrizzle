import Monthly from "../../components/Residential/Monthly";



const MonthlyPages = () => {
    return (
        <>
            <section className="Re">
                <div className="container" style={{ padding: "0px 8px" }}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:'20px'}}>
                        <img src="https://tpc.googlesyndication.com/simgad/6849559758438259367" alt="" />
                    </div>
                    <Monthly/>
                </div>
            </section>
        </>
    )
};
export default MonthlyPages;
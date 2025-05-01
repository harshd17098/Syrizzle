import Motors from "../../components/Motors/cars/Motors";


export default function MotorsPage() {
    return (
        <section className="Motors">
            <div className="container" style={{ padding: "0px 8px" }}>
                {/* Banner Ad */}
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: "100%",
                        height: "250px",
                        backgroundImage:
                            "url(https://static.dubizzle.com/frontend-web/listings/assets/ads/web_leaderboard_970x250.jpg)",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "970px 250px",
                    }}
                >
                    <img
                        src="https://tpc.googlesyndication.com/simgad/14638138952428951354"
                        alt="Advertisement"
                        style={{
                            width: "970px",
                            height: "250px",
                            objectFit: "cover",
                        }}
                    />
                </div>

                {/* Motors Section */}
                <div
                    style={{
                        width: "100%",
                        boxShadow: "none",
                        marginLeft: "unset",
                        marginRight: "unset",
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        borderRadius: "10px 10px 0px 0px",
                    }}
                >
                    <Motors/>
                </div>
            </div>
        </section>
    );
}

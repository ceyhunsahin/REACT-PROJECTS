

export default function Cards({data}) {









    return (
        <div className="cards">
            <div className="topOfCard">
                <h1> POPULAR TOUR PLACES</h1>
            </div>
            {data.map((item) => (
                <div className="cardDesign">
                    <h3>{item.city}</h3>
                    <img src={item.image_link} alt={item.name} />
                    <p>{item.description}</p>
                </div>
            )
        
        )}
            
        </div>
    )
}

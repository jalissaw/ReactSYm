const key = 'brjo6knrh5r9g3ot7150';


class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            stockSymbol: [],
            isLoaded: false
        }
    }

    typeSymbol = (e) => {
        this.setState({
            userInput: e.target.value.toUpperCase()
        }, (e) => {
            console.log(this.state.userInput)
        })
    }

    getSymbol = (e) => {
        e.preventDefault()
    }

    componentDidMount() {
        fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)
            .then(res => res.json())
            .then(
                (results) => {
                    this.setState({
                        isLoaded: true,
                        stockSymbol: results
                    });
                    console.log(results[0])
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { stockSymbol, userInput } = this.state



        return (
            <div className="enterstock">
                <h1 className="title">Enter Stock Symbol</h1>
                <span className="symbol">{this.state.userInput}</span>
                <form className="inputfields" onSubmit={this.getSymbol}>
                    <input type="text" className="symfields" name="symbolname" onChange={this.typeSymbol}></input>
                </form>
                {stockSymbol.map((stock, i) => {
                    if (userInput === stock.symbol) {
                        return <h2 className="symboldescription" key={i}>
                            {stock.description}
                        </h2>
                    }
                })}
            </div>
        )

    }
}




ReactDOM.render(
    <Stocks />,
    document.getElementById('root')
)
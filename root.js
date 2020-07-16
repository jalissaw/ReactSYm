const key = 'brjo6knrh5r9g3ot7150';


class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            stockSymbol: [],
            open: [],
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

        const urls = [
            `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`,
            `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${key}`,
            `https://finnhub.io/api/v1/scan/support-resistance?symbol=IBM&resolution=30&token=${key}`,
            `https://api.iextrading.com/1.0/tops?symbols=IBM`
        ]

        let requests = urls.map(url => fetch(url))
        Promise.all(requests)
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            }).then(responses => {
                this.setState({
                    stockSymbol: responses[0],
                    open: responses[1]
                })
                console.log(this.state.stockSymbol)
                console.log(this.state.open)
            })



        // fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)
        //     .then(res => res.json())
        //     .then(
        //         (results) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 stockSymbol: results
        //             });
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
    }


    render() {
        const { stockSymbol, userInput, open } = this.state



        return (
            <div className="enterstock">
                <h1 className="title">Enter Stock Symbol</h1>
                <span className="symbol">{this.state.userInput}</span>
                <form className="inputfields" onSubmit={this.getSymbol}>
                    <input type="text" className="symfields" name="symbolname" onChange={this.typeSymbol}></input>
                </form>
                {stockSymbol.map((stock, i) => {
                    if (userInput === stock.symbol) {
                        return (
                            <ul className="symboldescription" key={i}>
                                <li key={i}>{stock.description}</li>
                                <li key={i}>{open.c}</li>
                            </ul>
                        )
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
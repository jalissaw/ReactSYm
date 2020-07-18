const key = 'brjo6knrh5r9g3ot7150';

// const currentSymbol = fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`)
//     .then((res) => {
//         return res.json()
//     }).then((results) => {
//         return results.map(result => {
//             return result
//         })
//     })


function getSymbol() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onload = () => {
        const symbols = JSON.parse(httpRequest.responseText);
        for (let i = 0; i < symbols.length; i++) {
            const currentSymbol = symbols[i]
        }
        httpRequest.open('GET', `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`, true);
        httpRequest.send();
    }
}

console.log(getSymbol())


const urls = [
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`,
    `https://finnhub.io/api/v1/quote?symbol=AUS&token=${key}`,
    `https://finnhub.io/api/v1/scan/support-resistance?symbol=A&resolution=30&token=${key}`,
    `https://api.iextrading.com/1.0/tops?symbols=A`
]



class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            stockSymbol: [],
            open: [],
            support: [],
            volume: [],
            isLoaded: false
        }
    }

    typeSymbol = (e) => {
        this.setState({
            userInput: e.target.value.toUpperCase(),
        }, (e) => {
            console.log(this.state.userInput)
        })
    }

    getSymbol = (e) => {
        console.log(stock)
    }

    componentDidMount() {

        let requests = urls.map(url => fetch(url))
        Promise.all(requests)
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            }).then(responses => {
                this.setState({
                    stockSymbol: responses[0],
                    open: responses[1],
                    support: responses[2],
                    volume: responses[3]
                })
                console.log(responses)
                console.log(this.state.stockSymbol)
                console.log(this.state.open)
                console.log(this.state.support)
                console.log(this.state.volume)
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
        const { stockSymbol, userInput, open, support, volume } = this.state



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
                                <li key={i}>{support.levels[0]}</li>
                                <li key={i}>{volume[0].volume}</li>
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
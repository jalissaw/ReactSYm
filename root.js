class Stocks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            stockSymbol: [],
            symbol1: []
        }
    }


    typeSymbol = _.debounce((e) => {
        this.setState({ userInput: e.target.value.toUpperCase() })
    }, 1000)


    componentDidMount() {
        const urls = [
            `https://api.iextrading.com/1.0/ref-data/symbols`
        ]

        let requests = urls.map(url => fetch(url))
        Promise.all(requests)
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            }).then(responses => {
                this.setState({
                    stockSymbol: responses[0]
                })
            })
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        const { userInput } = this.state;

        if (prevState.userInput !== userInput && userInput !== '') {
            fetch(`https://finnhub.io/api/v1/quote?symbol=${userInput}&token=budo2rv48v6spq9og4p0`)
                .then(res => res.json())
                .then(responses => this.setState({
                    symbol1: responses
                }))
        }

    }


    render() {
        const { stockSymbol, userInput, symbol1 } = this.state;
        const Router = window.ReactRouterDOM.BrowserRouter;
        const Route = window.ReactRouterDOM.Route;
        const Link = window.ReactRouterDOM.Link;
        const Prompt = window.ReactRouterDOM.Prompt;
        const Switch = window.ReactRouterDOM.Switch;
        const Redirect = window.ReactRouterDOM.Redirect;

        const filteredSymbols = stockSymbol.filter(
            (sym) => sym.symbol === userInput
        )

        const clock = new Date().toLocaleString()

        return (
            <Router>
                <div className="enterstock">
                    <div className="fields">
                        {/* <div className="profilelink">
                            <button>Company Profile</button>
                        </div> */}
                        <span className="clock">{clock}</span>
                        <h1 className="title">Enter Stock Symbol</h1>
                        <input type="text" className="symfields" name="symbolname" onChange={(e) => { e.persist(); this.typeSymbol(e) }} />
                    </div>
                    {filteredSymbols.map((stock, i) => {
                        return (
                            <div className="stockings">
                                <div className="named">
                                    <h2 className="symbol">{this.state.userInput}</h2>
                                    <h2 className=" name" key={i}>{stock.name}</h2>
                                </div>
                                {<h2 className="stocked price" key={i}>Price: {symbol1.c}</h2>}
                                {<h2 className="stocked price" key={i}>Low: {symbol1.l}</h2>}
                                {<h2 className="stocked price" key={i}>High: {symbol1.h}</h2>}
                                {<h2 className="stocked price" key={i}>Open: {symbol1.o}</h2>}
                                {<h2 className="stocked price" key={i}>Previous Close: {symbol1.pc}</h2>}
                                {<h2 className="stocked price" key={i}>Range: {(symbol1.h - symbol1.l).toFixed(2)}</h2>}
                            </div>
                        );
                    })},
                </div>
            </Router>
        );
    }
}


ReactDOM.render(
    <Stocks />,
    document.getElementById('root')
)
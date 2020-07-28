



class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            stockSymbol: [],
            marketData: [],
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

    componentDidMount() {

        const urls = [
            `https://api.iextrading.com/1.0/ref-data/symbols`,
            `https://api.iextrading.com/1.0/tops`
        ]


        let requests = urls.map(url => fetch(url))
        Promise.all(requests)
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            }).then(responses => {
                this.setState({
                    stockSymbol: responses[0],
                    marketData: responses[1],
                    isLoaded: true
                }),
                    console.log(this.state.marketData)
            })

    }


    render() {
        const { stockSymbol, userInput, marketData } = this.state;

        const filteredSymbols = stockSymbol.filter(
            (sym) => sym.symbol === userInput
        );
        const foundMarket = marketData.find(
            (market) => market.symbol === userInput
        );
        if (marketData === undefined || marketData === []) {
            return (<div>
                The database that has been provided for the stocks has
                timed out. It should be up and running shortly. Sorry for any inconvenience!
            </div>)
        }
        console.log(foundMarket)
        const clock = new Date().toLocaleString()

        return (
            <div className="enterstock">
                <div className="fields">
                    <span className="clock">{clock}</span>
                    <h1 className="title">Enter Stock Symbol</h1>
                    <input type="text" className="symfields" name="symbolname" onChange={this.typeSymbol} />
                </div>
                {filteredSymbols.map((stock, i) => {
                    return (
                        <div className="stockings">
                            <div className="named">
                                <h2 className="symbol">{this.state.userInput}</h2>
                                <h2 className=" name" key={i}>{stock.name}</h2>
                            </div>
                            <h2 className="stocked price" key={i}>Price: {foundMarket.lastSalePrice}</h2>
                            <h2 className="stocked bidsize" key={i}>Bid Size: {foundMarket.bidSize}</h2>
                            <h2 className="stocked bidprice" key={i}>Bid Price: {foundMarket.bidPrice}</h2>
                            <h2 className="stocked asksize" key={i}>Ask Size: {foundMarket.askSize}</h2>
                            <h2 className="stocked askprice" key={i}>Ask Price: {foundMarket.askPrice}</h2>
                            <h2 className="stocked volume" key={i}>Volume: {foundMarket.volume}</h2>
                            <h2 className="stocked sector" key={i}>Sector: {foundMarket.sector}</h2>
                        </div>
                    );
                })},
            </div>
        );
    }
}


ReactDOM.render(
    <Stocks />,
    document.getElementById('root')
)
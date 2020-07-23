

// class Market extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             marketdata: []
//         }
//     }

//     componenetDidMount() {
//         fetch(`https://api.iextrading.com/1.0/tops`)
//             .then(res => res.json())
//             .then(data => {
//                 this.setState({
//                     marketdata: data
//                 })
//             })
//     }

//     render() {
//         const { marketdata } = this.state

//         marketdata.map(market => {
//             <div className="asks">
//                 <h2 key={market.symbol}>{market.volume}</h2>
//             </div>
//         })


//     }
// }

// export default Market;

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markets: [],
            tweet: {
                authorFullname: null,
                authorImg: null,
                authorUsername: null,
                id: null,
                text: null
            }
        };

        window.addEventListener('message', async (e) => {
            try {
                const currentTweet = JSON.parse(e.data);
                if (!currentTweet.id) return;

                if (!this.marketsJson) {
                    const response = await fetch('/api/markets');
                    this.marketsJson = await response.json();
                }

                const markets = this.marketsJson.markets.filter(m =>
                    this.marketsJson.tweets[currentTweet.id] && this.marketsJson.tweets[currentTweet.id].indexOf(m.id) != -1);

                this.setState(state => ({ markets: markets, tweet: currentTweet }));
            } catch (ex) { }
        });

        this.search = React.createRef();
        this.searchType = React.createRef();
    }

    handleChange() {
        const search = this.search.current.value;
        const searchType = this.searchType.current.value;

        let markets = [];

        if (searchType == 'Tweet') {
            markets = this.marketsJson.markets.filter(m => this.marketsJson.tweets[this.state.tweet.id] && this.marketsJson.tweets[this.state.tweet.id].indexOf(m.id) != -1);
        } else {
            markets = this.marketsJson.markets;
        }

        markets = markets.filter(m => m && m.title.toLowerCase().indexOf(search.toLowerCase()) != -1);

        this.setState(state => ({ markets: markets }));
    }

    render() {
        const { state } = this;

        return (<div className="container">
            <h4>Prediction Markets</h4>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">⌕</span>
                </div>
                <input onChange={() => this.handleChange()} ref={this.search} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                <select className="form-control" onChange={() => this.handleChange()} ref={this.searchType}>
                    <option>Tweet</option>
                    <option>Global</option>
                </select>
            </div>

            {!state.tweet.id ? <p>Select tweet</p> : (
                state.markets.length > 0 ? state.markets.map(m => (<div className="card" key={m.id}>
                    <div className="card-body">
                        <h5 className="card-title">{m.title}</h5>
                        <p className="card-subtitle mb-2 text-muted">Volume: {m.total} ETH</p>
                        <p className="card-subtitle mb-2 text-muted">Exp: {m.expDate}</p>
                        {m.results.map((m, i) => (<button key={i} type="button" className="btn btn-dark btn-sm">{m.text} - {m.value}</button>))}
                    </div>
                </div>)) : <p>There is no related prediction markets.</p>
            )}
        </div>);
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

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

                const response = await fetch('./data.json');
                const json = await response.json();

                const markets = json.markets.filter(m =>
                    json.tweets[currentTweet.id] && json.tweets[currentTweet.id].indexOf(m.id) != -1);

                this.setState(state => ({ markets: markets, tweet: currentTweet }));
            } catch (ex) { }
        });
    }

    render() {
        const { state } = this;

        return (<div className="container">
            <h3>Related Prediction Markets</h3>

            {!state.tweet.id ? <p>Select tweet</p> : (
                state.markets.length > 0 ? state.markets.map(m => (<div className="card" key={m.id}>
                    <div className="card-body">
                        <h5 className="card-title">{m.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Total: {m.total} ETH, Expiration Date: {m.expDate}</h6>
                        {m.results.map((m, i) => (<button key={i} type="button" className="btn btn-dark btn-sm">{m.text} - {m.value}%</button>))}
                    </div>
                </div>)) : <p>There is no related prediction markets.</p>
            )}
        </div>);
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root')
);
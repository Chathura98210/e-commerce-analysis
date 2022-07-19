// MessageParser starter code
import axios from 'axios';
class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    componentDidMount() {
        // Simple GET request using axios
        axios.get('http://localhost:5000/items')
            .then(response => this.setState({ totalReactPackages: response.data.total }));
    }

    parse(message) {
        const lowercase = message.toLowerCase();

        if(lowercase.includes("hello") || lowercase.includes("hi") || lowercase.includes("hay") || lowercase.includes("hey")){
            this.actionProvider.greet()
        }

        if(lowercase.includes("how") && lowercase.includes("many")){

            if(lowercase.includes("items") || lowercase.includes("products")){
                console.log('how many items')
            }

            if(lowercase.includes("category") || lowercase.includes("groups")){
                console.log('how many category')
            }
            
        }

        if(lowercase.includes("what")){

            if(lowercase.includes("categories") || lowercase.includes("category")){
                console.log('what are the categories')
            }
        }
    }
}

export default MessageParser;
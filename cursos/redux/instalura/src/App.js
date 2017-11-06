import React, {Component} from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import TimelineStore from './stores/TimelineStore'

const timelineStore = new TimelineStore([]);

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header/>
                    <Timeline store={timelineStore}/>
                </div>
            </div>
        );
    }
}

export default App;

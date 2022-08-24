import React, { Component } from "react";
import './ChatComponent.css'
import chats from "./chats.json";
import questions from "./questions.json";
import answers from "./answers.json";
import { v4 as uuidv4 } from 'uuid';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatStructure: {},
            chatId: "",
            chatDisplay: []
        };

        this.loadChat = this.loadChat.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        let chatStructure = {};
        let answerData = {}

        answers.forEach(answer => {
            answer.qids.forEach(id => {
                if (!answerData[id]) answerData[id] = [];
                if (answer.atext) {
                    answerData[id].push(answer.atext)
                } else if (answer.range) {
                    answerData[id].push(answer.range)
                }


            })

        })

        let questionsData = {}

        questions.forEach(question => {
            questionsData[question.qid] = { question: question.qtext, questionType: question.qtype };
        })

        chats.forEach(chat => {
            let chatQuestions = [];
            chat.questions.forEach(question => {
                const askedQuestion = questionsData[question.qid].question;
                const answeredQuestionOptions = answerData[question.qid];
                let answeredQuestion = "";

                switch (questionsData[question.qid].questionType) {


                    case 2:
                        answeredQuestion = Math.floor(Math.random() * (answeredQuestionOptions[0].max - answeredQuestionOptions[0].min) + answeredQuestionOptions[0].min)
                        break;
                    case 3:
                        const RandomIndex = Math.floor(Math.random() * answeredQuestionOptions.length)
                        answeredQuestion = answeredQuestionOptions[RandomIndex];
                        break;
                    default:
                        answeredQuestion = "My answer";


                }

                chatQuestions.push({ question: askedQuestion, answer: answeredQuestion, order: question.order })


            })
            chatQuestions.sort((a, b) => a.order - b.order)
            chatStructure[chat.chatID] = chatQuestions;
        })

        this.setState({ chatStructure: chatStructure });

    }

    loadChat(chatId) {
        const display = [];
        if (this.state.chatStructure[chatId]) {
            this.state.chatStructure[chatId].forEach(chat => {
                display.push(chat)

            })
        }

        this.setState({ chatDisplay: display });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.loadChat(this.state.chatId);
    }

    render() {

        return (
            <div id="ChatComponent">
                <form className="ChatComponentForm" onSubmit={this.handleSubmit}>
                    <label>
                        Chat ID:
                        <input name="chatId" type="string" value={this.state.chatId} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Load Chat" />
                </form>
                <div id="chatArea">
                    {this.state.chatDisplay.map(chat =>
                        <div key={uuidv4()}>
                            <div className="my-message">
                                {chat.question}
                            </div>
                            <div className="other-message">
                                {chat.answer}
                            </div>
                        </div>

                    )}

                </div>
            </div>

        )
    }
}

export default ChatComponent;
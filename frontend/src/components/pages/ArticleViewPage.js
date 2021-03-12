import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import ReactLoading from 'react-loading';

export class ArticleViewPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = { loading: true, data: null};

        this.handleClick = (e) => this.modal.current.show();
        this.handleModalSubmit = (e) => this.populateData();
    }

    componentDidMount() {
        this.populateData();
    }

    renderArticle() {
        const article = this.state.data;
        console.log("Открываю статью", article);
        return (
            <Form>
                <FormGroup row>
                    <Label sm={2}>ID</Label>
                    <Col sm={10}>
                        <Input> {article.id} </Input >
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label  sm={2}>Название</Label>
                    <Col sm={10}>
                        <Input value={article.title} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Автор</Label>
                    <Col sm={10}>
                        <Input value={article.author} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Класс</Label>
                    <Col sm={10}>
                        <Input value={article.classkey} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Среднее время чтения</Label>
                    <Col sm={10}>
                        <Input value={article.middleReadingTime} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Количество лайков</Label>
                    <Col sm={10}>
                        <Input value={article.likeCount} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Текст</Label>
                    <Col sm={10}>
                        <Input value={article.text} />
                    </Col>
                </FormGroup>
            <Button>Submit</Button>
        </Form>);
    }

    render() {
        const contents = this.state.loading
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
            : this.renderArticle();

        return contents;
    }

    async populateData() {
        this.setState({ loading: true, data: null });
        const url = 'api/article/'+this.id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ loading: false, data: data});
    }
}

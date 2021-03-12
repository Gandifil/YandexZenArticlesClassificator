import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import { TagViewItem } from '../rows/TagViewItem';
import { Link } from "react-router-dom";
import { browserHistory } from 'react-router';
import { useHistory } from "react-router-dom";

export class ArticleViewPage extends Component {

    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = { loading: true, data: null, loadingTags: true, tags: null, deleted: false };

        this.handleClick = (e) => this.modal.current.show();
        this.handleModalSubmit = (e) => this.populateData();
        this.handleDelete = (e) => this.delete();
    }

    componentDidMount() {
        this.populateData();
    }

    delete() {
        const url = 'api/article/' + this.id;
        const response = fetch(url, {
            method: 'DELETE'
        });
        this.state.deleted = true;
        this.setState(this.state);
    }

    renderArticle() {
        const article = this.state.data;
        console.log("Открываю статью", article);
        return (
            <Form>
                <fieldset disabled={this.state.deleted}> 
                <header className="modal-title">Статья</header>
                <FormGroup row>
                    <Label sm={2}>ID</Label>
                    <Col sm={10}>
                        <Label> {article.id} </Label >
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
                    <Label sm={2}>Теги</Label>
                    <Col>
                            {this.renderTags()}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Текст</Label>
                    <Col sm={10}>
                        <textarea value={article.text} rows="20" cols="130" />
                    </Col>
                    </FormGroup>
                    </fieldset> 
                <Link to={'/articles'} className="btn btn-secondary btn-lg m-2">Назад</Link>
                <Button color="danger" size="lg" className="m-2" disabled={this.state.deleted} onClick={this.handleDelete }>Удалить</Button>
                <Button color="warning" size="lg" className="m-2" disabled={this.state.deleted}>Изменить</Button>
                <Button color="primary" size="lg" className="m-2" disabled={this.state.deleted}>Сохранить</Button>
        </Form>);
    }
    
              //  <Button color="secondary" size="lg" onClick={useHistory().goBack}>Назад</Button>

    renderTags() {
        const contents = this.state.loadingTags
            ? <ReactLoading type="cylon" color="black" height={66} width={37} />
            : this.state.tags.map(x => <TagViewItem tag={x} />);

        return contents;
    }

    render() {
        const contents = this.state.loading
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
            : this.renderArticle();

        return contents;
    }

    populateData() {
        this.populateArticle();
        this.populateTags();
    }

    async populateArticle() {
        this.state.loading = true;
        this.setState(this.state);

        const url = 'api/article/' + this.id;
        const response = await fetch(url);
        const data = await response.json();

        this.state.loading = false;
        this.state.data = data;
        this.setState(this.state);
    }

    async populateTags() {
        this.state.loadingTags = true;
        this.setState(this.state);

        const url = 'api/article/' + this.id + '/tags';
        const response = await fetch(url);
        const data = await response.json();

        this.state.loadingTags = false;
        this.state.tags = data;
        this.setState(this.state);
    }
}

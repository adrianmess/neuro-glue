import React from "react";
import ReactQuill, { Quill } from "react-quill";
import { firestore } from "./firebase";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
import highlight from "highlight.js";
import "./Notes.scss";

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      newNoteID: "",
      newNoteTitle: "",
      newNoteContent: "",
      newNoteBoolean: false,
      newNoteCategory: "",
      selectedNoteID: "",
      selectedNoteTitle: "",
      selectedNoteContent: "",
      showNoteEditor: false,
      noteCardState: "newNote",
      editorHtml: "",
      theme: "snow"
    };

    this.quillContainer = React.createRef();

    this.titleChangeHandler = this.titleChangeHandler.bind(this);
  }

  componentDidMount() {
    const newNoteID = Date.now();
    this.setState({
      newNoteID
    });
  }

  newNote = e => {
    e.preventDefault();
    const noteID = Date.now();

    console.log("new note click");
    this.setState({
      selectedNoteContent: "",
      selectedNoteTitle: "",
      selectedNoteID: "",
      newNoteTitle: "",
      newNoteContent: "",
      newNoteCategory: "",
      noteCardState: "newNote",
      newNoteID: noteID
    });
  };

  selectNote(e, noteID) {
    e.preventDefault();
    const notes = { ...this.props.notes };
    const selectedNoteTitle = notes[noteID].noteTitle;
    const selectedNoteContent = notes[noteID].noteContent;

    this.setState({
      selectedNoteID: noteID,
      noteCardState: "selectedNote"
    });

    if (selectedNoteTitle !== undefined) {
      this.setState({
        selectedNoteTitle
      });
    }
    if (selectedNoteTitle === undefined) {
      this.setState({
        selectedNoteTitle: ""
      });
    }

    if (selectedNoteContent === undefined) {
      this.setState({
        selectedNoteContent: ""
      });
    }
    if (selectedNoteContent !== undefined) {
      this.setState({
        selectedNoteContent
      });
    }
  }

  titleChangeHandler = async event => {
    const { userID } = this.props;
    const { newNoteID, selectedNoteID, noteCardState } = this.state;

    const noteTitle = event.target.value;

    if (noteCardState === "newNote" && noteTitle !== "") {
      this.setState({ newNoteTitle: noteTitle });

      await firestore
        .collection(`${userID}`)
        .doc(`Notes`)
        .update({
          [`${newNoteID}.noteTitle`]: `${noteTitle}`
        });
    }

    if (noteCardState === "selectedNote") {
      this.setState({ selectedNoteTitle: noteTitle });

      await firestore
        .collection(`${userID}`)
        .doc(`Notes`)
        .update({
          [`${selectedNoteID}.noteTitle`]: `${noteTitle}`
        });
    }
  };

  //   sendQuillContainerHeight = () => {
  //     this.props.setCardEditorHeight(this.quillContainer.current.clientHeight);
  //   };

  handleChangeNote = async noteContent => {
    // console.log("handle change");
    const { userID } = this.props;
    const {
      selectedNoteID,
      newNoteID,
      newNoteContent,
      selectedNoteContent,
      noteCardState
    } = this.state;

    if (noteCardState === "newNote") {
      this.setState({ newNoteContent: noteContent });
      await firestore
        .collection(`${userID}`)
        .doc(`Notes`)
        .update({
          [`${newNoteID}.noteContent`]: `${noteContent}`
        });
    }

    if (noteCardState === "selectedNote") {
      // console.log("handlechange selected note");
      this.setState({ selectedNoteContent: noteContent });
      await firestore
        .collection(`${userID}`)
        .doc(`Notes`)
        .update({
          [`${selectedNoteID}.noteContent`]: `${noteContent}`
        });
    }
  };

  //   setCardEditorHeight = height => {
  //     document
  //       .getElementById("cardEditor")
  //       .style.setProperty("height", height + "px", "important");
  //   };

  deleteNote(e, noteID) {
    e.preventDefault();
    e.stopPropagation();
    // const noteID = this.state.noteID;
    this.props.deleteNote(noteID);
    // await firestore
    //     .collection(`${userID}`)
    //     .doc(`Notes`)
    //     .update({
    //       [`${selectedNoteID}.noteContent`]: `${noteContent}`
    //     });
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    const notesList = { ...this.props.notes };
    const {
      noteCardState,
      newNoteContent,
      newNoteTitle,
      selectedNoteTitle,
      selectedNoteContent
    } = this.state;

    const hljs = new highlight.configure({
      // optionally configure hljs
      languages: ["javascript", "ruby", "python", "html"]
    });
    const modules = {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["code-block"],
        ["link", "image", "video"],
        ["clean"]
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: true
      },
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true
      }
    };
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */


    return (
      <div id="notes-main">
        <div>
          <h3>All Notes</h3>
          <div>
            <button onClick={event => this.newNote(event)} id="new_Note_Button">
              New Note
            </button>
          </div>
          <div id="notes_list_container">
            {Object.keys(notesList).map(noteIDs => (
              <div
                key={noteIDs}
                onClick={event => this.selectNote(event, noteIDs)}
                className="noteContainer"
              >
                <div className="notesTitle">{notesList[noteIDs].noteTitle}</div>
                <div className="note-Content">
                  {notesList[noteIDs].noteContent !== (null || undefined) ? (
                    <div className="note-Content-subcontainer">
                      <div>{renderHTML(notesList[noteIDs].noteContent)}</div>
                    </div>
                  ) : (
                    <span />
                  )}
                </div>
                <div className="card-button-removeContainer">
                  <span
                    className="card-button-remove"
                    onClick={event => this.deleteNote(event, noteIDs)}
                  >
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="notesEditorContainer">
          <div>
            {noteCardState === "selectedNote" ? (
              <div>
                <div>
                  <input
                    id="noteInputTitle"
                    placeholder="Title"
                    value={selectedNoteTitle}
                    onChange={this.titleChangeHandler}
                  />
                </div>
                <div id="notes-quill-container" ref={this.quillContainer}>
                  <ReactQuill
                    onChange={this.handleChange}
                    name="notes"
                    value={selectedNoteContent}
                    onChange={this.handleChangeNote}
                    className="quillNote"
                    modules={modules}
                    bounds={".app"}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <input
                    id="noteInputTitle"
                    placeholder="Title"
                    value={newNoteTitle}
                    onChange={this.titleChangeHandler}
                  />
                </div>

                <div id="notes-quill-container" ref={this.quillContainer}>
                  <ReactQuill
                    onChange={this.handleChange}
                    name="notes"
                    value={newNoteContent}
                    onChange={this.handleChangeNote}
                    className="quillNote"
                    modules={modules}
                    bounds={".app"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;

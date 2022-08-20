import React from "react";
import { Spinner, Table, TableProps } from "react-bootstrap";
import { into_readable_datetime } from "../../utils/functions";
import { NoteInfo } from "../../utils/types";
import * as changeCase from "change-case";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/constants";

type Props = TableProps & {
  notes: NoteInfo[][],
  loading?: boolean,
  loadMore?: boolean,
  loadMoreOnClick?: () => void,
}

type NoteInfoKey = keyof NoteInfo;
// make keyof T as array with constraint all keys must exist
// const noteInfoKeys = <T extends NoteInfoKey[]>(
//   array: T & ([NoteInfoKey] extends [T[number]] ? unknown : 'Invalid')
// ) => array;

const NotesTable = ({ loading, notes, loadMore, loadMoreOnClick, ...attributes }: Props) => {
  return (
    <Table {...attributes} >
      <thead>
        <tr>
          {
            Array<NoteInfoKey>(
              "id",
              "title",
              "created_at",
              "expires_at",
            ).map((header, _, arr) => {
              let custom: string | undefined;
              const cc = changeCase.capitalCase;
              switch (header) {
                case "id":
                  custom = "ID";
                  break;
                case "expires_at":
                  custom = cc("expires in");
                  break;
              }

              return (<th style={{ width: 100 / arr.length + "%" }} key={header}>{custom || cc(header)}</th>);
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          notes.map((gnote, i) => {
            return (
              <React.Fragment key={i}>
                {gnote.map(note => {
                  return (
                    <tr key={note.created_at.secs_since_epoch}>
                      <td>
                        <Link to={PATHS.note_detail + "/" + encodeURIComponent(note.id)}>
                          {note.id}
                        </Link>
                      </td>
                      <td>{note.title}</td>
                      <td>{into_readable_datetime(note.created_at.secs_since_epoch)}</td>
                      <td>{
                        note.expires_at
                          ? (
                            <>
                              <i className="bi bi-hourglass-split"></i>
                              <Countdown
                                date={note.expires_at.secs_since_epoch * 1000}
                              />
                            </>
                          )
                          : "Never"
                      }</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })
        }
        {
          loading === true && <tr><td colSpan={4} className="text-center py-2"><Spinner animation="border" /></td></tr>
        }
        {
          loadMore === true && loadMoreOnClick
          && <tr style={{ cursor: "pointer" }}>
            <td colSpan={4} className="text-center" onClick={loadMoreOnClick}>Load more!</td>
          </tr>
        }
        {
          !loading && (notes[0] === undefined || !notes[0].length) && <tr><td colSpan={4} className="text-center">Bushwack, it's empty!</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default NotesTable;

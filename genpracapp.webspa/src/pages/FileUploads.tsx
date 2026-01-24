import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useMemo, useRef, useState } from "react";

type FileUploadRecord = {
    id: string;
    fileName: string;
    extension: string;
    initialUploadDate: Date;
    lastEditedDate: Date;
};

const getExtension = (name: string): string => {
    const lastDot = name.lastIndexOf(".");
    if (lastDot <= 0 || lastDot === name.length - 1) return "";
    return name.slice(lastDot + 1).toLowerCase();
};

const formatDate = (date: Date) => date.toLocaleString();

const FileUploads = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [records, setRecords] = useState<FileUploadRecord[]>(() => {
        const now = new Date();
        return [
            {
                id: crypto.randomUUID(),
                fileName: "example-document.pdf",
                extension: "pdf",
                initialUploadDate: now,
                lastEditedDate: now,
            },
        ];
    });

    const [editRecordId, setEditRecordId] = useState<string | null>(null);
    const recordBeingEdited = useMemo(
        () => records.find((r) => r.id === editRecordId) ?? null,
        [records, editRecordId]
    );
    const [editFileName, setEditFileName] = useState<string>("");

    const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const onPickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const now = new Date();
        const newRecord: FileUploadRecord = {
            id: crypto.randomUUID(),
            fileName: file.name,
            extension: getExtension(file.name),
            initialUploadDate: now,
            lastEditedDate: now,
        };

        setRecords((prev) => [newRecord, ...prev]);

        e.target.value = "";
    };

    const startEdit = (record: FileUploadRecord) => {
        setEditRecordId(record.id);
        setEditFileName(record.fileName);
    };

    const cancelEdit = () => {
        setEditRecordId(null);
        setEditFileName("");
    };

    const saveEdit = () => {
        if (!recordBeingEdited) return;

        const trimmed = editFileName.trim();
        if (!trimmed) return;

        setRecords((prev) =>
            prev.map((r) => {
                if (r.id !== recordBeingEdited.id) return r;
                return {
                    ...r,
                    fileName: trimmed,
                    extension: getExtension(trimmed),
                    lastEditedDate: new Date(),
                };
            })
        );

        cancelEdit();
    };

    const requestDelete = (record: FileUploadRecord) => {
        setDeleteRecordId(record.id);
    };

    const cancelDelete = () => {
        setDeleteRecordId(null);
    };

    const confirmDelete = () => {
        if (!deleteRecordId) return;
        setRecords((prev) => prev.filter((r) => r.id !== deleteRecordId));
        setDeleteRecordId(null);
    };

    return (
        <Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
                gap={2}
                sx={{ mb: 2 }}
            >
                <Box>
                    <Typography variant="h4" sx={{ mb: 0.5 }}>
                        File Uploads
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create uploads and manage existing records.
                    </Typography>
                </Box>

                <Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={onPickFile}
                    />
                    <Button
                        variant="contained"
                        startIcon={<UploadFileIcon />}
                        onClick={openFilePicker}
                    >
                        Create
                    </Button>
                </Box>
            </Stack>

            <TableContainer component={Paper} variant="outlined">
                <Table size="small" aria-label="file uploads table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File name</TableCell>
                            <TableCell>Extension</TableCell>
                            <TableCell>Initial upload date</TableCell>
                            <TableCell>Last edited date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((r) => (
                            <TableRow key={r.id} hover>
                                <TableCell>{r.fileName}</TableCell>
                                <TableCell>{r.extension || "—"}</TableCell>
                                <TableCell>{formatDate(r.initialUploadDate)}</TableCell>
                                <TableCell>{formatDate(r.lastEditedDate)}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        aria-label={`edit ${r.fileName}`}
                                        onClick={() => startEdit(r)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        aria-label={`delete ${r.fileName}`}
                                        onClick={() => requestDelete(r)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {records.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ py: 4 }}>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        No uploads yet. Click Create to add one.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={Boolean(recordBeingEdited)} onClose={cancelEdit} fullWidth maxWidth="sm">
                <DialogTitle>Edit upload</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="File name"
                        fullWidth
                        value={editFileName}
                        onChange={(e) => setEditFileName(e.target.value)}
                        helperText="Changing the name also recalculates the extension."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelEdit}>Cancel</Button>
                    <Button onClick={saveEdit} variant="contained" disabled={!editFileName.trim()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(deleteRecordId)} onClose={cancelDelete}>
                <DialogTitle>Delete upload?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        This will remove the record from the table.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FileUploads;

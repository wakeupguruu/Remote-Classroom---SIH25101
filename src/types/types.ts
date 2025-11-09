export interface Lecture {
    id: string,
    title: string,
    mode: Lecturemode,
    createdAt: number,
    startingTime: number,
    endingTime: number,
    video: string[],
    lecturerId: string[],
    uploadedDocIds: string[],
    aiNotesIds: string[],
    lecturersName: string,
    lectureresUsername:string
}

enum Lecturemode{
    BRODCAST = "brodcast",
    INTERACTIVE = "interactive"
}

export interface Video{
    id: string,
    onlineLink: string,
    title: string,
    timeStamp: string,
}

export interface Chat{
    id: string,
    lectureId: string,
    userId: string,
    timestamp: string,
    message: string
}

export interface Enrollment {
    id: string; 
    studentId: string; 
    lectureId: string; 
    // Indicates if the student has actively joined the lecture 
    joined: boolean; 
   enrolledAt: number; 
  }


  export interface Docs{
    id: string,
    type: DocumentType;
    location: string;
    fileSizeKB: number;
    title: string;
    uploadedAt: Date,
    uploadedByUserId: string,
    isPublic: boolean
  }
  export enum DocumentType {
    PDF = 'pdf',
    SLIDE = 'slide',
    HANDOUT = 'handout',
    OTHER = 'other',
  }

  export interface History {
    id: string; 
    userId: string; 
    itemType: HistoryItemType;
    itemId: string;
    action: string; 
    timestamp: number; 
    progressPercentange: number  //if logging video progress
}
export enum HistoryItemType {
    LECTURE = 'lecture',
    DOCUMENT = 'document',
    VIDEO = 'video',
    AI_NOTE = 'ai_note'
}

export interface AiNotes{
    id: string,
    text: string,

    lectureId: string
    createdAt: number;

    title?: string
}

export interface Settings{
    themeMode: "light" | "dark",
    downloadPreference: "wifi Only" | "Any Network"
    downloadQualityPreference: "high" | "medium" | "low"
    dowanloadLocationPreference: string,
    notificatoinPreference: string[],
    notification: boolean
    language: string,
    userId: string,

}


export interface OfflineDownloads{
    id: string,
    userId: string,
    itemType: OfflineDownloadItemType,
    itemId: string,
    downloadStatus: DownloadStatus,
    downloadedAt: number,
    fileSizeKB: number,
    fileLocation: string
}

export enum OfflineDownloadItemType {
    LECTURE = 'lecture',
    DOCUMENT = 'document',
    VIDEO = 'video'
}
export enum DownloadStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    FAILED = 'failed'
}
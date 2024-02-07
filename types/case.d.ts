import React from 'react';

export interface ICaseDetail {
  title: string;
  tag: string[];
  desc: string;
  urls: string[];
  cover?: boolean;
}

export interface CaseDetailProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ICaseDetail | null;
}
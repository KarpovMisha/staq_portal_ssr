'use client';
import React from 'react';
import styles from './Avatar.module.scss';

const MAX_MB = 5;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);

export async function updateAvatar(file: File) {
  const form = new FormData();
  form.append('avatar', file);

  console.log(form);

  const res = await fetch('/api/profile/avatar', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error('Avatar upload failed');
  }

  return res.json() as Promise<{ avatarUrl: string }>;
}

export default function AvatarUploader() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const initials = 'BW';
  // create a preview when a file is selected
  React.useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function validate(f: File): string | null {
    if (!ALLOWED.has(f.type)) return 'Format not supported. Use JPG/PNG/WebP.';
    const mb = f.size / 1024 / 1024;
    if (mb > MAX_MB) return `File is too large. Maximum ${MAX_MB}MB.`;
    return null;
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (!f) return;

    const v = validate(f);
    if (v) {
      setFile(null);
      setError(v);
      return;
    }

    setFile(f);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File:', file);
  }
  // what to show inside the circle:
  // 1) if a file is selected — preview
  // 2) else if there is a currentAvatarUrl — show it
  // 3) else show initials
  const avatarContent = previewUrl ? (
    <img src={previewUrl} alt="New avatar preview" />
  ) : initials;

  return (
    <div className={styles.root}>
      <div className={styles.label}>Avatar</div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.avatar}>{avatarContent}</div>
          </div>

          <div className={styles.actions}>
            <label className={styles.uploadButton}>
              Upload Photo
              <input type="file" accept="image/*" onChange={onPickFile} />
            </label>

            <button type="submit" className={styles.saveButton} disabled={!file || isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {/* <div className={styles.hint}>JPG/PNG/WebP, up to {MAX_MB}MB</div>  */}
      </form>
    </div>
  );
}

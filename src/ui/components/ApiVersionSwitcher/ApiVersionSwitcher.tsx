'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { apiReferencesActions } from '@/store/slices/apiReferences';

export function ApiVersionSwitcher() {
  const dispatch = useAppDispatch();
  const currentApi = useAppSelector((state) => state.apiReferences.currentApi);
  const selectedVersion = useAppSelector(
    (state) => state.apiReferences.selectedVersion
  );

  if (!currentApi) return null;

  const versions = [{ version: 1 }, ...currentApi.versions].filter(
    (item, index, arr) => arr.findIndex((x) => x.version === item.version) === index
  );

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {versions.map((item) => (
        <button
          key={item.version}
          onClick={() => dispatch(apiReferencesActions.setSelectedVersion(item.version))}
          style={{
            padding: '8px 12px',
            border: '1px solid #555',
            background: selectedVersion === item.version ? '#fff' : 'transparent',
            color: selectedVersion === item.version ? '#000' : '#fff',
            cursor: 'pointer',
          }}
        >
          v{item.version}
        </button>
      ))}
    </div>
  );
}

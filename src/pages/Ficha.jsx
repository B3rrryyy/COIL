import { useState, useRef } from "react";
import "./ficha.css";

// ─── Subcomponents ────────────────────────────────────────────────────────────

const CellInput = ({ name, value, onChange, type = "text", placeholder = "", style = {} }) => (
  <input
    className="cell-input"
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={style}
    autoComplete="off"
  />
);

const CheckCell = ({ label, checked, onChange }) => (
  <div className="check-cell">
    <input
      type="checkbox"
      className="check-box"
      checked={checked}
      onChange={onChange}
    />
    <span className="check-label">{label}</span>
  </div>
);

const SectionHeader = ({ children, cols = 1 }) => (
  <tr>
    <td className="section-header" colSpan={cols}>
      {children}
    </td>
  </tr>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TIPOS_INFRAESTRUCTURA = [
  { key: "reglamentarias", label: "Reglamentarias" },
  { key: "preventivas",    label: "Preventivas"    },
  { key: "informativas",   label: "Informativas"   },
  { key: "guardavia",      label: "Guardavía"      },
  { key: "alcantarilla",   label: "Alcantarilla"   },
  { key: "canaleta",       label: "Canaleta"       },
  { key: "puente",         label: "Puente"         },
];

const MATERIALES = [
  { key: "metal",    label: "Metal"    },
  { key: "pvc",      label: "PVC"      },
  { key: "aluminio", label: "Alumínio" },
  { key: "concreto", label: "Concreto" },
  { key: "madera",   label: "Madera"   },
  { key: "otro",     label: "Otro"     },
];

const initialState = {
  numero_ficha: "",
  fecha: "",
  provincia: "Santo Domingo de los Tsáchilas",
  canton: "Santo Domingo",
  parroquia: "Puerto Limón",
  tramo_vial: "Vía Quevedo-Pto Limón",
  tipos: {},
  materiales: {},
  longitud: "",
  elementos_reflectivos: null, // true | false | null
  estado: null, // 'bueno' | 'malo' | 'regular' | null
  utm_este: "",
  utm_norte: "",
  observaciones: "",
  foto_url: null,
};

export default function App() {
  const [form, setForm] = useState(initialState);
  const [guardado, setGuardado] = useState(false);
  const fileRef = useRef(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCheckGroup = (group, key) => {
    setForm((f) => ({
      ...f,
      [group]: { ...f[group], [key]: !f[group][key] },
    }));
  };

  const handleRadio = (field, value) => {
    setForm((f) => ({ ...f, [field]: f[field] === value ? null : value }));
  };

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, foto_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: POST to FastAPI /api/v1/fichas
    console.log("Ficha data:", JSON.stringify(form, null, 2));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleLimpiar = () => {
    if (window.confirm("¿Desea limpiar todos los campos?")) {
      setForm(initialState);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="page-bg">
      <form className="ficha-wrapper" onSubmit={handleSubmit} noValidate>

        {/* ═══ ENCABEZADO ═══════════════════════════════════════════════════ */}
        <table className="ficha-table" style={{ marginBottom: 0 }}>
          <tbody>
            <tr>
              <td className="header-institution" colSpan={5}>
                <div className="header-inner">
                  <div className="header-logo">
                    {/* PUCE compass SVG */}
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <circle cx="26" cy="26" r="24" stroke="#2563A8" strokeWidth="2.5" fill="white"/>
                      <circle cx="26" cy="26" r="16" stroke="#2563A8" strokeWidth="1.5" fill="none"/>
                      <line x1="26" y1="2"  x2="26" y2="50" stroke="#2563A8" strokeWidth="1.5"/>
                      <line x1="2"  y1="26" x2="50" y2="26" stroke="#2563A8" strokeWidth="1.5"/>
                      <line x1="8"  y1="8"  x2="44" y2="44" stroke="#2563A8" strokeWidth="1"/>
                      <line x1="44" y1="8"  x2="8"  y2="44" stroke="#2563A8" strokeWidth="1"/>
                      <circle cx="26" cy="26" r="4" fill="#2563A8"/>
                    </svg>
                  </div>
                  <div className="header-title-block">
                    <div className="header-title">UNIVERSIDAD PONTÍFICE CATÓLICA DEL ECUADOR — SEDE SANTO DOMINGO</div>
                    <div className="header-subtitle">CARRERA DE INGENIERÍA CIVIL · SISTEMA COIL - INFRAESTRUCTURA VIAL</div>
                  </div>
                  <div className="header-code-block">
                    <div className="header-code-label">N° Ficha</div>
                    <CellInput
                      name="numero_ficha"
                      value={form.numero_ficha}
                      onChange={handleField}
                      placeholder="GV-2025-0001"
                      style={{ fontWeight: 700, fontSize: 13, textAlign: "center", width: 130 }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ═══ FICHA TÉCNICA — SEÑALÉTICA ══════════════════════════════════ */}
        <table className="ficha-table">
          <tbody>
            <SectionHeader cols={8}>FICHA TÉCNICA — SEÑALÉTICA E INFRAESTRUCTURA VIAL</SectionHeader>

            {/* ── Ubicación ── */}
            <tr className="row-subheader">
              <td colSpan={8} className="subheader-cell">UBICACIÓN</td>
            </tr>
            <tr>
              <td className="label-cell" style={{ width: "8%" }}>Parroquia</td>
              <td className="value-cell" style={{ width: "14%" }}>
                <CellInput name="parroquia" value={form.parroquia} onChange={handleField} />
              </td>
              <td className="label-cell" style={{ width: "7%" }}>Cantón</td>
              <td className="value-cell" style={{ width: "14%" }}>
                <CellInput name="canton" value={form.canton} onChange={handleField} />
              </td>
              <td className="label-cell" style={{ width: "8%" }}>Provincia</td>
              <td className="value-cell" colSpan={3}>
                <CellInput name="provincia" value={form.provincia} onChange={handleField} />
              </td>
            </tr>
            <tr>
              <td className="label-cell">Fecha</td>
              <td className="value-cell">
                <CellInput name="fecha" value={form.fecha} onChange={handleField} type="date" />
              </td>
              <td className="label-cell">Tramo vial</td>
              <td className="value-cell" colSpan={5}>
                <CellInput name="tramo_vial" value={form.tramo_vial} onChange={handleField} />
              </td>
            </tr>

            {/* ── Infraestructura existente — header ── */}
            <SectionHeader cols={8}>INFRAESTRUCTURA EXISTENTE</SectionHeader>

            {/* ── Tipo + Material — column headers ── */}
            <tr>
              <td className="col-header" colSpan={4}>Tipo</td>
              <td className="col-header" colSpan={4}>Material</td>
            </tr>

            {/* ── Tipo + Material — checkboxes ── */}
            {Array.from({ length: Math.max(TIPOS_INFRAESTRUCTURA.length, MATERIALES.length) }).map((_, i) => {
              const tipo = TIPOS_INFRAESTRUCTURA[i];
              const mat  = MATERIALES[i];
              return (
                <tr key={i}>
                  {tipo ? (
                    <>
                      <td className="check-label-cell" style={{ width: "18%" }}>{tipo.label}</td>
                      <td className="check-box-cell" colSpan={3}>
                        <input
                          type="checkbox"
                          className="check-box"
                          checked={!!form.tipos[tipo.key]}
                          onChange={() => handleCheckGroup("tipos", tipo.key)}
                        />
                      </td>
                    </>
                  ) : (
                    <td colSpan={4} className="empty-cell" />
                  )}
                  {mat ? (
                    <>
                      <td className="check-label-cell" style={{ width: "18%" }}>{mat.label}</td>
                      <td className="check-box-cell" colSpan={3}>
                        <input
                          type="checkbox"
                          className="check-box"
                          checked={!!form.materiales[mat.key]}
                          onChange={() => handleCheckGroup("materiales", mat.key)}
                        />
                      </td>
                    </>
                  ) : (
                    <td colSpan={4} className="empty-cell" />
                  )}
                </tr>
              );
            })}

            {/* ── Longitud + Elementos reflectivos ── */}
            <tr>
              <td className="label-cell">Longitud (m)</td>
              <td className="value-cell">
                <CellInput
                  name="longitud"
                  value={form.longitud}
                  onChange={handleField}
                  type="number"
                  placeholder="0.00"
                />
              </td>
              <td className="label-cell" colSpan={2}>Elementos Reflectivos</td>
              <td className="value-cell" colSpan={4}>
                <div style={{ display: "flex", gap: 24, alignItems: "center", padding: "2px 6px" }}>
                  {[{ val: true, label: "Sí" }, { val: false, label: "No" }].map(({ val, label }) => (
                    <label key={label} className="radio-label">
                      <input
                        type="checkbox"
                        className="check-box"
                        checked={form.elementos_reflectivos === val}
                        onChange={() => handleRadio("elementos_reflectivos", val)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </td>
            </tr>

            {/* ── Estado ── */}
            <tr>
              <td className="label-cell" rowSpan={2} style={{ textAlign: "center", verticalAlign: "middle", fontWeight: 700 }}>
                Estado
              </td>
              <td className="col-header" colSpan={2} style={{ textAlign: "center" }}>Bueno</td>
              <td className="col-header" colSpan={2} style={{ textAlign: "center" }}>Malo</td>
              <td className="col-header" colSpan={3} style={{ textAlign: "center" }}>Regular</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center", padding: 6 }}>
                <input
                  type="checkbox"
                  className="check-box check-box-lg"
                  checked={form.estado === "bueno"}
                  onChange={() => handleRadio("estado", "bueno")}
                />
              </td>
              <td colSpan={2} style={{ textAlign: "center", padding: 6 }}>
                <input
                  type="checkbox"
                  className="check-box check-box-lg"
                  checked={form.estado === "malo"}
                  onChange={() => handleRadio("estado", "malo")}
                />
              </td>
              <td colSpan={3} style={{ textAlign: "center", padding: 6 }}>
                <input
                  type="checkbox"
                  className="check-box check-box-lg"
                  checked={form.estado === "regular"}
                  onChange={() => handleRadio("estado", "regular")}
                />
              </td>
            </tr>

            {/* ── Fotografía ── */}
            <tr>
              <td className="subheader-cell" colSpan={8} style={{ padding: "4px 8px", fontSize: 12 }}>
                Fotografía
              </td>
            </tr>
            <tr>
              <td colSpan={8} className="foto-cell" onClick={() => fileRef.current?.click()}>
                {form.foto_url ? (
                  <img src={form.foto_url} alt="Fotografía de campo" className="foto-preview" />
                ) : (
                  <div className="foto-placeholder">
                    <div className="foto-icon">📷</div>
                    <div className="foto-hint">Clic para adjuntar fotografía de campo</div>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFoto}
                />
              </td>
            </tr>

            {/* ── Coordenadas UTM ── */}
            <tr>
              <td className="label-cell" rowSpan={2} style={{ textAlign: "center", verticalAlign: "middle" }}>
                Coordenadas<br />UTM
              </td>
              <td className="col-header" colSpan={2} style={{ textAlign: "center" }}>ESTE</td>
              <td className="value-cell" colSpan={5}>
                <CellInput
                  name="utm_este"
                  value={form.utm_este}
                  onChange={handleField}
                  type="number"
                  placeholder="762000.000"
                />
              </td>
            </tr>
            <tr>
              <td className="col-header" colSpan={2} style={{ textAlign: "center" }}>NORTE</td>
              <td className="value-cell" colSpan={5}>
                <CellInput
                  name="utm_norte"
                  value={form.utm_norte}
                  onChange={handleField}
                  type="number"
                  placeholder="9750000.000"
                />
              </td>
            </tr>

            {/* ── Observaciones ── */}
            <tr>
              <td className="label-cell" style={{ verticalAlign: "top", paddingTop: 8 }}>
                Observaciones
              </td>
              <td colSpan={7} style={{ padding: 0 }}>
                <textarea
                  className="obs-textarea"
                  name="observaciones"
                  value={form.observaciones}
                  onChange={handleField}
                  placeholder="Ingrese observaciones técnicas relevantes de la inspección..."
                  rows={4}
                />
              </td>
            </tr>

          </tbody>
        </table>

        {/* ═══ BARRA DE ACCIONES ════════════════════════════════════════════ */}
        <div className="actions-bar">
          <div className="status-info">
            {guardado && (
              <span className="status-ok">✓ Ficha guardada correctamente</span>
            )}
          </div>
          <div className="actions-right">
            <button type="button" className="btn btn-secondary" onClick={handleLimpiar}>
              Limpiar campos
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Ficha
            </button>
          </div>
        </div>

        {/* ═══ PIE DE PÁGINA ════════════════════════════════════════════════ */}
        <div className="ficha-footer">
          <span>Sistema COIL — Infraestructura Vial · PUCE Santo Domingo</span>
          <span>Registro de campo · Versión 1.0</span>
        </div>

      </form>
    </div>
  );
}
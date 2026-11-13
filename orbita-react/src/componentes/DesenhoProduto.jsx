import React from "react";
export default function DesenhoProduto({
  tipo,
  cor = "#d4d9cc",
  grande = false,
}) {
  const escuro = "#263e39";
  return (
    <svg
      viewBox="0 0 320 240"
      className={grande ? "desenho grande" : "desenho"}
      aria-hidden="true"
    >
      <ellipse cx="160" cy="209" rx="91" ry="12" fill="#142d23" opacity=".09" />
      {tipo === "fone" && (
        <g transform="rotate(-13 160 120)">
          <path
            d="M87 145 V102 C87 13 233 13 233 102 V145"
            fill="none"
            stroke={escuro}
            strokeWidth="22"
          />
          <path
            d="M87 112 V99 C87 25 233 25 233 99 V112"
            fill="none"
            stroke={cor}
            strokeWidth="14"
          />
          <rect x="67" y="112" width="43" height="82" rx="20" fill={escuro} />
          <rect x="210" y="112" width="43" height="82" rx="20" fill={escuro} />
          <rect x="65" y="111" width="31" height="77" rx="15" fill={cor} />
          <rect x="224" y="111" width="31" height="77" rx="15" fill={cor} />
        </g>
      )}
      {tipo === "teclado" && (
        <g transform="translate(25 74) rotate(-9 130 55)">
          <rect width="270" height="116" rx="15" fill={escuro} />
          <rect x="3" y="0" width="264" height="104" rx="12" fill={cor} />
          {Array.from({ length: 4 }, (_, linha) =>
            Array.from({ length: 12 }, (_, coluna) => (
              <rect
                key={`${linha}-${coluna}`}
                x={11 + coluna * 21}
                y={10 + linha * 22}
                width="17"
                height="17"
                rx="3"
                fill={
                  linha === 3 && coluna > 3 && coluna < 9
                    ? "#9da991"
                    : "#faf8f0"
                }
              />
            )),
          )}
        </g>
      )}
      {tipo === "mouse" && (
        <g transform="rotate(18 160 120)">
          <rect x="105" y="39" width="110" height="165" rx="54" fill={escuro} />
          <rect x="104" y="34" width="110" height="160" rx="54" fill={cor} />
          <path d="M159 36 V101" stroke="#9d9b92" />
          <rect x="153" y="57" width="12" height="33" rx="6" fill={escuro} />
        </g>
      )}
      {tipo === "caixa" && (
        <g>
          <rect x="95" y="37" width="130" height="166" rx="30" fill={escuro} />
          <rect x="96" y="33" width="122" height="162" rx="28" fill={cor} />
          <circle cx="157" cy="123" r="43" fill="#64786e" />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M124 ${96 + i * 9} H191`}
              stroke={cor}
              strokeWidth="3"
            />
          ))}
          <circle cx="157" cy="61" r="7" fill={escuro} />
        </g>
      )}
      {tipo === "luminaria" && (
        <g>
          <ellipse cx="155" cy="195" rx="57" ry="13" fill={escuro} />
          <path
            d="M153 190 V113 Q153 52 208 52"
            fill="none"
            stroke={escuro}
            strokeWidth="12"
          />
          <path d="M177 51 Q208 -3 239 51 Z" fill={cor} />
          <ellipse cx="208" cy="51" rx="31" ry="8" fill="#e5efa8" />
          <path d="M207 61 L171 164 H244 Z" fill="#f2edb1" opacity=".25" />
        </g>
      )}
      {tipo === "monitor" && (
        <g>
          <rect x="35" y="28" width="250" height="155" rx="12" fill={escuro} />
          <rect x="44" y="37" width="232" height="134" rx="5" fill={cor} />
          <path d="M44 151 Q122 49 199 102 T276 63 V171 H44Z" fill="#90ada2" />
          <circle cx="225" cy="69" r="20" fill="#e9edc7" />
          <path
            d="M145 182 V206 H113 M174 182 V206 H206"
            fill="none"
            stroke={escuro}
            strokeWidth="10"
          />
        </g>
      )}
      {tipo === "camera" && (
        <g>
          <path d="M149 140 V183 H120 V199 H200 V183 H172 V140" fill={escuro} />
          <rect x="58" y="64" width="204" height="83" rx="33" fill={escuro} />
          <rect x="63" y="60" width="194" height="77" rx="31" fill={cor} />
          <circle cx="160" cy="99" r="30" fill={escuro} />
          <circle cx="160" cy="99" r="17" fill="#647f86" />
          <circle cx="167" cy="92" r="6" fill="#c4d9d7" />
          <circle cx="220" cy="99" r="4" fill={escuro} />
        </g>
      )}
      {tipo === "hub" && (
        <g transform="rotate(-15 160 120)">
          <path
            d="M72 116 H43 Q22 116 22 70 V54"
            fill="none"
            stroke={escuro}
            strokeWidth="7"
          />
          <rect x="67" y="79" width="219" height="96" rx="24" fill={escuro} />
          <rect x="67" y="73" width="219" height="84" rx="24" fill={cor} />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={91 + i * 46}
              y="126"
              width="30"
              height="13"
              rx="3"
              fill={escuro}
            />
          ))}
          <path d="M138 95 H217" stroke="#8e9e92" strokeWidth="3" />
        </g>
      )}
      {tipo === "suporte" && (
        <g>
          <path d="M73 167 L118 67 L249 121 L204 212Z" fill={escuro} />
          <path d="M68 157 L113 57 L244 111 L199 202Z" fill={cor} />
          <path d="M119 83 L222 125 L196 174 L95 133Z" fill="#b5b6ae" />
          <path
            d="M77 160 L197 209 L211 189"
            fill="none"
            stroke={escuro}
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

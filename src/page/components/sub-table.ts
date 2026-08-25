export function SubTable(): string {
    return `
    <script>
        class SubTable extends HTMLElement {
            static get observedAttributes() {
                return ['columns', 'data', 'row-key', 'empty-text', 'loading', 'actions'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.state = {
                    columns: [],
                    data: [],
                    actions: [],
                    rowKey: 'id',
                    emptyText: '暂无数据',
                    loading: false
                };
                this.#render();
            }

            #parseJson(value, fallback) {
                if (!value) return fallback;
                try {
                    return JSON.parse(value);
                } catch (e) {
                    console.error('Invalid JSON for sub-table:', e);
                    return fallback;
                }
            }

            #syncFromAttributes() {
                this.state.columns = this.#parseJson(this.getAttribute('columns'), []);
                this.state.data = this.#parseJson(this.getAttribute('data'), []);
                this.state.actions = this.#parseJson(this.getAttribute('actions'), []);
                this.state.rowKey = this.getAttribute('row-key') || 'id';
                this.state.emptyText = this.getAttribute('empty-text') || '暂无数据';
                this.state.loading = this.hasAttribute('loading');
            }

            connectedCallback() {
                this.#syncFromAttributes();
                this.#updateBody();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) return;
                this.#syncFromAttributes();
                this.#updateBody();
            }

            #injectStyle() {
                const style = document.createElement('style');
                style.textContent = \`
                    :host {
                        display: block;
                        width: 100%;
                        height: 100%;
                        min-height: 0;
                        font-size: 14px;
                        color: var(--text-primary);
                    }
                    .sub-table {
                        width: 100%;
                        height: 100%;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        overflow: auto;
                        background: var(--background);
                        box-sizing: border-box;
                    }
                    table {
                        width: 100%;
                        min-width: 520px;
                        border-collapse: collapse;
                        table-layout: fixed;
                    }
                    thead th {
                        text-align: left;
                        padding: 10px 12px;
                        background: var(--background-secondary, var(--background));
                        border-bottom: 1px solid var(--border-color);
                        color: var(--text-secondary, var(--text-primary));
                        font-weight: 600;
                        white-space: nowrap;
                        position: sticky;
                        top: 0;
                        z-index: 1;
                    }
                    tbody td {
                        padding: 10px 12px;
                        border-bottom: 1px solid var(--border-color);
                        color: var(--text-primary);
                        vertical-align: middle;
                    }
                    tbody tr:last-child td {
                        border-bottom: none;
                    }
                    tbody tr:hover td {
                        background: var(--background-secondary, rgba(127,127,127,0.08));
                    }
                    .ellipsis {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .actions {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        flex-wrap: wrap;
                    }
                    .action-btn {
                        appearance: none;
                        background: transparent;
                        border: none;
                        padding: 0;
                        color: var(--primary-color);
                        cursor: pointer;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                    .action-btn:hover {
                        opacity: 0.8;
                    }
                    .action-btn.danger {
                        color: #ff4d4f;
                    }
                    .action-btn:focus,
                    .action-btn:focus-visible {
                        outline: none;
                        box-shadow: none;
                    }
                    .empty,
                    .loading {
                        padding: 28px 12px;
                        text-align: center;
                        color: var(--text-secondary, var(--text-disabled));
                    }
                    /* 窄屏：表格保持最小宽度以便横向滚动查看完整内容 */
                    @media (max-width: 640px) {
                        thead th, tbody td { padding: 8px 10px; }
                        thead th { font-size: 13px; }
                    }
                \`;
                this.shadowRoot.appendChild(style);
            }

            #injectElement() {
                const root = document.createElement('div');
                root.className = 'sub-table';
                root.innerHTML = \`
                    <table>
                        <thead><tr></tr></thead>
                        <tbody></tbody>
                    </table>
                    <div class="empty" hidden></div>
                    <div class="loading" hidden>加载中...</div>
                \`;
                this.shadowRoot.appendChild(root);
                root.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action]');
                    if (!btn) return;
                    const action = btn.getAttribute('data-action');
                    const rowKey = btn.getAttribute('data-row-key');
                    const row = this.state.data.find(item => String(item[this.state.rowKey]) === String(rowKey));
                    if (!row) return;
                    this.dispatchEvent(
                        new CustomEvent('table:action', {
                            detail: { action, row, rowKey },
                            bubbles: true
                        })
                    );
                });
            }

            #updateBody() {
                const table = this.shadowRoot.querySelector('table');
                const theadRow = this.shadowRoot.querySelector('thead tr');
                const tbody = this.shadowRoot.querySelector('tbody');
                const empty = this.shadowRoot.querySelector('.empty');
                const loading = this.shadowRoot.querySelector('.loading');
                if (!table || !theadRow || !tbody || !empty || !loading) return;

                theadRow.innerHTML = '';
                this.state.columns.forEach(col => {
                    const th = document.createElement('th');
                    th.textContent = col.title || '';
                    if (col.width) th.style.width = col.width;
                    theadRow.appendChild(th);
                });

                tbody.innerHTML = '';
                if (this.state.loading) {
                    table.hidden = true;
                    empty.hidden = true;
                    loading.hidden = false;
                    return;
                }

                loading.hidden = true;
                if (!this.state.data.length) {
                    table.hidden = true;
                    empty.hidden = false;
                    empty.textContent = this.state.emptyText;
                    return;
                }

                table.hidden = false;
                empty.hidden = true;

                this.state.data.forEach(row => {
                    const tr = document.createElement('tr');
                    const rowKey = row[this.state.rowKey];
                    this.state.columns.forEach(col => {
                        const td = document.createElement('td');
                        if (col.type === 'actions') {
                            const wrap = document.createElement('div');
                            wrap.className = 'actions';
                            this.state.actions.forEach(action => {
                                const btn = document.createElement('button');
                                btn.type = 'button';
                                btn.className = action.danger ? 'action-btn danger' : 'action-btn';
                                btn.textContent = action.label || action.key;
                                btn.setAttribute('data-action', action.key);
                                btn.setAttribute('data-row-key', String(rowKey));
                                wrap.appendChild(btn);
                            });
                            td.appendChild(wrap);
                        } else {
                            const text = row[col.key] == null ? '' : String(row[col.key]);
                            td.textContent = text;
                            td.title = text;
                            if (col.ellipsis) td.classList.add('ellipsis');
                        }
                        if (col.width) td.style.width = col.width;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
            }

            #render() {
                this.#injectStyle();
                this.#injectElement();
            }
        }
        customElements.define('sub-table', SubTable);
    </script>
    `;
}

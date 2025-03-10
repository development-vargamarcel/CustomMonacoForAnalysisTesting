// Configura Monaco per usare i file locali
require.config({
  paths: {
    vs: 'monaco-editor/vs'
  }
});

// Definisci le configurazioni per ogni linguaggio

const SQLconfig = {
  language: "sql",
  formatter: (inputString) => {
    return window.sqlFormatter.format(inputString);
  },
  testSource: source1SQL  // source1SQL è una stringa contenente il codice SQL da formattare //TODO: Questo puo essere rimosso prima della produzione.
};
const VBconfig = {
  language: "vb",
  formatter: (inputString) => {
    var sourcePretty = vbspretty({
      level: 0,
      indentChar: '\t',
      breakLineChar: '\r\n',
      breakOnSeperator: false,
      removeComments: false,
      source: inputString,
    });
    function modifyString(text) {
      return text.replace(/(?<=\"--).*?(?=;\")/s, (match) => {
        // console.log(match);
        return "\n" + window.sqlFormatter.format(match)
      });
    }
    const modifiedString = modifyString(sourcePretty)
    console.log(modifiedString)
    return modifiedString
    // return sourcePretty;

  },
  testSource: source1VB_SQL //source2VB // source1VB è una stringa contenente il codice VB da formattare //TODO: Questo puo essere rimosso prima della produzione.
};

const config = VBconfig; // Puoi alternare tra VBconfig e SQLconfig in base al linguaggio desiderato.
var editorValue = config.testSource;// Usa la configurazione //TODO: Questo puo essere rimosso prima della produzione.

// Carica Monaco Editor
require(['vs/editor/editor.main'], function () {
  //----
  const SQLLang = monaco.languages.getLanguages().find(lang => lang.id === 'sql');
  console.log(SQLLang);
  SQLLang.loader()
    .then(({ conf, language }) => {
      // Configure Monaco
      monaco.languages.setMonarchTokensProvider('sql', language);
      monaco.languages.setLanguageConfiguration('sql', conf);
      console.log(language, conf);
    })
    .catch(error => {
      console.error('Errore carricamento linguaggio sql:', error);
    });

  const VBLang = monaco.languages.getLanguages().find(lang => lang.id === 'vb');
  console.log(VBLang);
  VBLang.loader()
    .then(({ conf, language }) => {
      // Configure Monaco
      // monaco.languages.setMonarchTokensProvider('vb', language);
      monaco.languages.setMonarchTokensProvider('vb', {
        ...language,
        tokenizer: {
          ...language.tokenizer,
          root: [
            [/(\")/, {
              token: 'string.quote.vb',
              next: '@vbString'
            }],
            [/'.*/, 'comment'],
            // [/(Dim|As|New|Sub|Function|End)\b/, 'keyword'],
            [/[a-zA-Z_]\w*/, 'identifier'],
            ...language.tokenizer.root,
          ],
          vbString: [
            [/(--)/, {
              token: 'sql-start',
              next: '@sqlInString',
              nextEmbedded: 'sql'  // Inject SQL here
            }],
            [/[^"]/, 'string'],
            [/"C?/, { token: 'string.quote.vb', next: '@pop' }]
          ],
          sqlInString: [
            [/(;)/, {
              token: 'sql-end',
              next: '@pop',
              nextEmbedded: '@pop'  // Exit SQL mode
            }],
            [/[\s\S]/, 'sql-content']
          ]
        },
        embeddedLanguages: {
          'sql-content': 'sql'  // Map token to SQL language
        }
      });
      monaco.languages.setLanguageConfiguration('vb', config);
      console.log(language, conf);
      faiTutto()
    })
    .catch(error => {
      console.error('Errore carricamento linguaggio vb:', error);
    });
  //----
  //--
  monaco.languages.register({ id: 'vb' });
  monaco.languages.register({ id: 'sql' });

  //--
  const faiTutto = () => {
    // Inizializza l'editor
    const editor = monaco.editor.create(
      document.getElementById('editor-container'),
      {
        value: editorValue,
        language: config.language, // Usa la configurazione
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        formatOnType: true,
      }
    );


    // Registra il provider di formattazione del documento
    monaco.languages.registerDocumentFormattingEditProvider(config.language, { // Usa la configurazione
      provideDocumentFormattingEdits: function (model, options, token) {
        const formattedText = config.formatter(model.getValue()); // Usa la configurazione
        return [
          {
            range: model.getFullModelRange(),
            text: formattedText,
          },
        ];
      },
    });

    // Aggiungi azione per formattare il testo selezionato
    editor.addAction({
      id: 'format-selected-text',
      label: 'Format Selezionato',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: function () {
        const selections = editor.getSelections();
        if (selections.length === 0) {
          console.log("Nessun testo selezionato per la formattazione.");
          return;
        }

        const model = editor.getModel();
        const edits = [];
        selections.forEach(selection => {
          const selectedText = model.getValueInRange(selection);
          const formattedText = config.formatter(selectedText); // Usa la configurazione
          console.log({ selectedText, formattedText });
          edits.push({
            range: selection,
            text: formattedText,
          });
        });

        model.pushEditOperations(selections, edits.map(edit => ({
          range: edit.range,
          text: edit.text,
        })), () => null);
      }
    });
    // Aggiungi azione per formattare il testo selezionato con formattatore SQL
    editor.addAction({
      id: 'format-selected-sql-text',
      label: 'Format SQL Selezionato',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.1, // Posiziona sotto la formattazione principale
      run: function () {
        const selections = editor.getSelections();
        if (selections.length === 0) return;

        const model = editor.getModel();
        const edits = [];

        selections.forEach(selection => {
          const selectedText = model.getValueInRange(selection);
          const formattedText = SQLconfig.formatter(selectedText); // Usa direttamente la configurazione SQL

          edits.push({
            range: selection,
            text: formattedText,
          });
        });

        model.pushEditOperations(selections, edits.map(edit => ({
          range: edit.range,
          text: edit.text,
        })), () => null);
      }
    });
  }
});

import importlib, sys, os, traceback

HERE = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.abspath(os.path.join(HERE, "..", "app", "backend"))
sys.path.insert(0, BACKEND)
os.chdir(BACKEND)

MODS = [
    "app", "main", "config", "error", "decorators",
    "approaches.approach", "approaches.chatapproach",
    "approaches.chatreadretrieveread", "approaches.chatreadretrievereadvision",
    "approaches.retrievethenread", "approaches.retrievethenreadvision",
    "core.authentication", "core.imageshelper",
    "prepdocs",
    "prepdocslib.filestrategy", "prepdocslib.searchmanager",
    "prepdocslib.embeddings", "prepdocslib.blobmanager",
    "prepdocslib.integratedvectorizerstrategy",
    "prepdocslib.pdfparser", "prepdocslib.htmlparser",
    "prepdocslib.textparser", "prepdocslib.jsonparser",
    "prepdocslib.textsplitter", "prepdocslib.listfilestrategy",
    "prepdocslib.fileprocessor", "prepdocslib.strategy", "prepdocslib.page",
]
fails = []
for m in MODS:
    try:
        importlib.import_module(m)
        print("OK  ", m)
    except Exception as e:
        print("FAIL", m, "->", type(e).__name__, str(e)[:250])
        fails.append(m)
print()
print(f"{len(MODS) - len(fails)}/{len(MODS)} passed. Failures: {fails}")
sys.exit(1 if fails else 0)

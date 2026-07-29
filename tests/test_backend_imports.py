"""Smoke tests: ensure every backend module imports cleanly.

These tests do NOT hit any Azure services. They only verify that the
Python dependency graph is intact after the modernization.
"""
import importlib
import os
import sys

import pytest

BACKEND = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app", "backend"))
if BACKEND not in sys.path:
    sys.path.insert(0, BACKEND)

MODULES = [
    "app",
    "main",
    "config",
    "error",
    "decorators",
    "approaches.approach",
    "approaches.chatapproach",
    "approaches.chatreadretrieveread",
    "approaches.chatreadretrievereadvision",
    "approaches.retrievethenread",
    "approaches.retrievethenreadvision",
    "core.authentication",
    "core.imageshelper",
    "prepdocs",
    "prepdocslib.filestrategy",
    "prepdocslib.searchmanager",
    "prepdocslib.embeddings",
    "prepdocslib.blobmanager",
    "prepdocslib.integratedvectorizerstrategy",
    "prepdocslib.pdfparser",
    "prepdocslib.htmlparser",
    "prepdocslib.textparser",
    "prepdocslib.jsonparser",
    "prepdocslib.textsplitter",
    "prepdocslib.listfilestrategy",
    "prepdocslib.fileprocessor",
    "prepdocslib.strategy",
    "prepdocslib.page",
]


@pytest.mark.parametrize("module_name", MODULES)
def test_module_imports(module_name: str) -> None:
    importlib.import_module(module_name)


def test_prepdocs_cli_argparse() -> None:
    """Ensure prepdocs.py CLI argparse block loads (guards against script-level regressions)."""
    import prepdocs  # noqa: F401

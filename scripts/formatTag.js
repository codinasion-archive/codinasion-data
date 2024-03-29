function formatString(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export default function formatTag(tag) {
  if (tag === "c" || tag === "C") {
    return {
      tag: "c",
      label: "C",
    };
  }
  if (tag === "c++" || tag === "C++" || tag === "cpp" || tag === "CPP") {
    return {
      tag: "cpp",
      label: "C++",
    };
  }
  if (tag === "cs" || tag === "c#" || tag === "CS" || tag === "C#") {
    return {
      tag: "cs",
      label: "C#",
    };
  }
  if (tag === "java" || tag === "Java" || tag === "JAVA") {
    return {
      tag: "java",
      label: "Java",
    };
  }
  if (
    tag === "py" ||
    tag === "Py" ||
    tag === "PY" ||
    tag === "python" ||
    tag === "Python" ||
    tag === "PYTHON"
  ) {
    return {
      tag: "python",
      label: "Python",
    };
  }
  if (tag === "GO" || tag === "go" || tag === "golang" || tag === "Go") {
    return {
      tag: "go",
      label: "GO",
    };
  }
  if (
    tag === "js" ||
    tag === "JS" ||
    tag === "Js" ||
    tag === "javascript" ||
    tag === "JavaScript" ||
    tag === "JAVASCRIPT"
  ) {
    return {
      tag: "js",
      label: "JS",
    };
  }
  if (tag === "php" || tag === "PHP" || tag === "Php") {
    return {
      tag: "php",
      label: "PHP",
    };
  }
  if (
    tag === "julia" ||
    tag === "Julia" ||
    tag === "JULIA" ||
    tag === "jl" ||
    tag === "JL" ||
    tag === "Jl"
  ) {
    return {
      tag: "julia",
      label: "Julia",
    };
  }
  if (
    tag === "rust" ||
    tag === "Rust" ||
    tag === "RUST" ||
    tag === "rs" ||
    tag === "RS" ||
    tag === "Rs"
  ) {
    return {
      tag: "rust",
      label: "Rust",
    };
  }
  if (
    tag === "dart" ||
    tag === "Dart" ||
    tag === "DART" ||
    tag === "dartlang" ||
    tag === "Dartlang"
  ) {
    return {
      tag: "dart",
      label: "Dart",
    };
  }
  if (tag === "swift" || tag === "Swift" || tag === "SWIFT") {
    return {
      tag: "swift",
      label: "Swift",
    };
  }
  if (
    tag === "kotlin" ||
    tag === "Kotlin" ||
    tag === "KOTLIN" ||
    tag === "kt" ||
    tag === "KT" ||
    tag === "Kt"
  ) {
    return {
      tag: "kotlin",
      label: "Kotlin",
    };
  }
  return {
    tag: tag.toLowerCase(),
    label: formatString(tag),
  };
}

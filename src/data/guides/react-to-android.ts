import type { Guide } from '../types';

/**
 * The flagship curated guide: a React/TS developer landing in native Android
 * with Kotlin and Jetpack Compose. Written to map onto things a senior React
 * developer already trusts, then flag where the ground actually shifts.
 */
export const reactToAndroid: Guide = {
  source: 'react',
  target: 'android',
  headline: 'From components to composables',
  intro:
    'Modern Android is closer to React than the forest looks from the edge. Jetpack Compose is declarative, state-driven UI, and your instincts about components, props, and "UI is a function of state" transfer almost intact. What changes underneath is the language (Kotlin, compiled and statically typed), the build system (Gradle, not npm), and the runtime (a real device with a lifecycle, not a browser tab you can refresh).',
  goodNews:
    'If you can think in "UI is a function of state" and one-way data flow, you already know how to think in Compose. The hard part is the toolchain around it, not the UI model.',

  mentalShifts: [
    {
      title: 'Compiled and typed, not shipped as source',
      from: 'You ship JS/TS that a runtime parses; TypeScript types vanish at build time and most mistakes surface at runtime.',
      to: 'Kotlin compiles to JVM bytecode ahead of time. Types are real and enforced, and null is part of the type system: `String` can never be null, `String?` can. Whole classes of runtime crashes become compile errors.',
    },
    {
      title: 'One language for everything',
      from: 'You split work across HTML for structure, CSS for style, and JS for behavior.',
      to: 'It is all Kotlin. Layout, styling, and logic are the same language. UI is built by calling functions and chaining `Modifier`s, not by writing markup and stylesheets.',
    },
    {
      title: 'A lifecycle instead of a page load',
      from: 'The page loads, you render, and a refresh wipes the slate. State lives as long as the tab does.',
      to: 'Your app runs inside an Activity with a lifecycle. The OS can rotate, background, or kill it to reclaim memory, then restore it. State you care about gets hoisted out of the UI (into a ViewModel) so it survives those events. It is the same "lift state up" instinct, enforced by the platform.',
    },
    {
      title: 'You target a matrix of devices, not browsers',
      from: 'Your support matrix is browser versions and you feature-detect or polyfill.',
      to: 'Your matrix is API levels (Android versions), screen sizes, and densities. You set a `minSdk`/`targetSdk` and gate newer APIs by version, the same shape as a browser-support baseline.',
    },
  ],

  rosetta: [
    {
      title: 'Language & types',
      rows: [
        { concept: 'Language', from: 'TypeScript', to: 'Kotlin', note: 'Both are typed, lambda-friendly, and inference-heavy. Kotlin will feel familiar fast.' },
        { concept: 'Type shape', from: 'interface / type', to: 'data class / interface', note: 'A `data class` gives you equality, copy(), and destructuring for free.' },
        { concept: 'Nullability', from: 'value | null | undefined', to: 'T vs T?', note: 'Null safety is in the compiler. `?.`, `?:` (elvis), and `!!` replace manual guards.' },
        { concept: 'async / await', from: 'Promise, async/await', to: 'suspend functions + coroutines', note: 'Structured concurrency. Promise.all → coroutineScope { } with awaitAll.' },
        { concept: 'Reactive streams', from: 'RxJS / observables', to: 'Kotlin Flow', note: 'Cold streams = Flow; hot state = StateFlow; events = SharedFlow.' },
      ],
    },
    {
      title: 'Build, dependencies & ecosystem',
      rows: [
        { concept: 'Package manager + bundler', from: 'npm / pnpm + Vite', to: 'Gradle (with the Android Gradle Plugin)', note: 'Gradle is both your installer and your build pipeline, in one.' },
        { concept: 'Manifest', from: 'package.json', to: 'build.gradle.kts', note: 'Dependencies live in the `dependencies { }` block, written in Kotlin.' },
        { concept: 'Registry', from: 'npmjs.com', to: 'Maven Central + Google’s Maven', note: 'No `npm search`; you browse Maven Central / docs and paste a coordinate.' },
        { concept: 'A dependency', from: '"react": "^19.2.0"', to: 'androidx.compose.ui:ui:1.7.0', note: 'Coordinates are group:artifact:version.' },
        { concept: 'Lockfile-ish central versions', from: 'package.json + lockfile', to: 'libs.versions.toml (version catalog)', note: 'One TOML file naming every dependency and version.' },
        { concept: 'node_modules', from: 'per-project node_modules', to: '~/.gradle global cache', note: 'Shared across projects; nothing bulky sits in your repo.' },
        { concept: 'install', from: 'npm install', to: 'Gradle sync', note: 'Android Studio runs it for you when build files change.' },
        { concept: 'scripts / npx', from: 'npm run / npx', to: './gradlew <task>', note: 'e.g. ./gradlew assembleDebug, ./gradlew test.' },
        { concept: 'monorepo workspaces', from: 'pnpm workspaces', to: 'Gradle multi-module (:app, :core, :feature-x)' },
      ],
    },
    {
      title: 'UI: Compose vs React',
      rows: [
        { concept: 'Component', from: 'function Component(props)', to: '@Composable fun Component(...)', note: 'A function that emits UI. Same idea, no JSX. You call other composables.' },
        { concept: 'Markup', from: 'JSX', to: 'Kotlin function calls', note: 'Column { Text("hi") } instead of <div>hi</div>.' },
        { concept: 'Local state', from: 'const [n, setN] = useState(0)', to: 'var n by remember { mutableStateOf(0) }' },
        { concept: 'Effects', from: 'useEffect', to: 'LaunchedEffect / DisposableEffect', note: 'Keyed the same way; DisposableEffect handles cleanup.' },
        { concept: 'Props', from: 'props', to: 'function parameters', note: 'Plain typed parameters with defaults.' },
        { concept: 'children / slots', from: '{children}', to: 'content: @Composable () -> Unit', note: 'Trailing-lambda slots are Compose’s children.' },
        { concept: 'Context', from: 'React Context', to: 'CompositionLocal' },
        { concept: 'Lists', from: 'items.map(<Row/>)', to: 'LazyColumn { items(list) { Row(it) } }', note: 'LazyColumn is virtualized by default, closer to a windowed list than .map.' },
        { concept: 'Re-render', from: 'reconciliation / re-render', to: 'recomposition', note: 'Compose re-invokes only the composables whose state changed.' },
        { concept: 'Memoization', from: 'useMemo / useCallback', to: 'remember { } + stable types', note: 'remember caches across recompositions; stability drives skipping.' },
        { concept: 'Styling', from: 'CSS / styled-components / MUI sx', to: 'Modifier chains + MaterialTheme', note: 'Modifier.padding(16.dp).background(...).fillMaxWidth().' },
        { concept: 'Flexbox', from: 'display:flex', to: 'Row / Column + Arrangement/Alignment', note: 'Modifier.weight(1f) is your flex-grow.' },
        { concept: 'Design system', from: 'MUI / Material UI', to: 'Material 3 for Compose', note: 'Same Material lineage; MaterialTheme { } is your ThemeProvider.' },
        { concept: 'Component preview', from: 'Storybook', to: '@Preview composables', note: 'Built into the IDE; render UI without launching the app.' },
      ],
    },
    {
      title: 'State, data & navigation',
      rows: [
        { concept: 'Global state', from: 'Redux / Zustand', to: 'ViewModel + StateFlow', note: 'Unidirectional data flow is the norm, so Flux instincts apply.' },
        { concept: 'Server state', from: 'TanStack Query + fetch/axios', to: 'Retrofit + OkHttp + coroutines', note: 'No exact Query equivalent; you cache with Room or a repository layer.' },
        { concept: 'JSON', from: 'JSON.parse / zod', to: 'kotlinx.serialization', note: 'Compile-time-generated, type-safe (de)serialization.' },
        { concept: 'Routing', from: 'React Router', to: 'Navigation Compose (NavHost)', note: 'Type-safe routes; the back stack is a first-class concept.' },
        { concept: 'Key/value storage', from: 'localStorage', to: 'DataStore (Preferences)' },
        { concept: 'Local database', from: 'IndexedDB', to: 'Room (SQLite ORM)' },
        { concept: 'Env config', from: '.env / import.meta.env', to: 'BuildConfig + product flavors' },
        { concept: 'Dependency wiring', from: 'providers / manual injection', to: 'Hilt or Koin (DI)', note: 'Dependency injection is a bigger deal here; nothing in React is a clean 1:1.' },
      ],
    },
    {
      title: 'Quality & dev loop',
      rows: [
        { concept: 'Editor', from: 'VS Code', to: 'Android Studio', note: 'IntelliJ-based and heavier; its GUI tooling is part of the workflow, not optional.' },
        { concept: 'Dev server / HMR', from: 'vite dev + HMR', to: 'Run + Live Edit / Apply Changes', note: 'First build is slow; iteration after that is fast.' },
        { concept: 'Run target', from: 'a browser tab', to: 'an emulator (AVD) or a USB-connected phone' },
        { concept: 'console.log', from: 'console.log / DevTools console', to: 'Log.d(...) → Logcat' },
        { concept: 'DevTools', from: 'Chrome DevTools', to: 'Layout Inspector + Profiler + debugger' },
        { concept: 'Lint / format', from: 'ESLint + Prettier', to: 'Android Lint + ktlint / detekt' },
        { concept: 'Unit tests', from: 'Vitest / Jest', to: 'JUnit + kotlin.test' },
        { concept: 'Component/UI tests', from: 'React Testing Library', to: 'Compose UI test (createComposeRule)', note: 'Espresso is the older equivalent for legacy View UIs.' },
        { concept: 'Distribution', from: 'deploy to a CDN / host', to: 'signed AAB to Google Play', note: 'You sign builds; the Play Console is the release surface.' },
      ],
    },
  ],

  gotchas: [
    {
      title: 'Gradle is not Vite',
      body: 'Cold builds take minutes, not milliseconds. This is the single biggest culture shock. Lean on incremental builds, Apply Changes / Live Edit, and @Preview so you are not doing a full build to see a color change.',
    },
    {
      title: 'Configuration changes recreate your screen',
      body: 'Rotating the device (or changing language, dark mode, font size) destroys and recreates the Activity. Anything held only in a composable is gone. The fix is the React instinct taken further: hoist real state into a ViewModel, which outlives those events.',
    },
    {
      title: 'The main thread is sacred',
      body: 'Blocking the UI thread freezes the app and can trigger an ANR ("Application Not Responding"). Network and disk work goes on coroutines dispatched to Dispatchers.IO. Think of it as a stricter event loop with no forgiveness for sync I/O.',
    },
    {
      title: 'Start with Compose, skip XML',
      body: 'Older Android UI is XML layouts + imperative Views + findViewById. It is everywhere in tutorials and Stack Overflow answers. For new work, use Compose and treat XML-layout results as legacy unless you are maintaining an old screen.',
    },
    {
      title: 'Version-compatibility matrix',
      body: 'Kotlin, the Android Gradle Plugin, Compose, and the Gradle wrapper all have to line up. It is peer-dependency friction, slower and with worse error messages. Use the version catalog and the official compatibility tables rather than bumping things one at a time.',
    },
    {
      title: 'Permissions and the manifest are real surface area',
      body: 'Camera, location, notifications, and storage require declared permissions and, since Android 6, runtime prompts. There is no equivalent of "just ask the browser". You design for granted, denied, and "don’t ask again".',
    },
  ],

  firstRun: [
    {
      title: 'Install Android Studio',
      body: 'It bundles the JDK, the Android SDK, Gradle, and the emulator. This one install replaces "set up Node, a bundler, and a dev server", with far less à-la-carte assembly.',
    },
    {
      title: 'New Project → Empty Activity (Compose)',
      body: 'Pick Kotlin. You get a runnable app with a MaterialTheme and a sample composable already wired up.',
    },
    {
      title: 'Read MainActivity.kt and spot the familiar parts',
      body: 'setContent { } is your createRoot().render(). The @Composable Greeting() is your <App/>. MaterialTheme { } is your <ThemeProvider>.',
      code: `class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {                       // ReactDOM.createRoot(...).render(...)
      AppTheme {                       // <ThemeProvider>
        Greeting(name = "Android")     // <Greeting name="Android" />
      }
    }
  }
}

@Composable
fun Greeting(name: String) {
  var count by remember { mutableStateOf(0) }   // const [count, setCount] = useState(0)
  Column(Modifier.padding(24.dp)) {             // <div style={{ padding: 24, display:'flex', flexDirection:'column' }}>
    Text("Hello, $name")                        // <p>Hello, {name}</p>
    Button(onClick = { count++ }) {             // <button onClick={() => setCount(c => c + 1)}>
      Text("Tapped $count times")
    }
  }
}`,
    },
    {
      title: 'Press Run',
      body: 'An emulator boots and the app installs. The first build is the slow one (your "npm install + first dev server" moment); subsequent runs are quick.',
    },
    {
      title: 'Iterate with @Preview and Live Edit',
      body: 'Add @Preview to a composable to render it in the IDE without launching the app. That is your Storybook. Live Edit / Apply Changes pushes small changes to the running app without a full rebuild.',
      code: `@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
  AppTheme { Greeting(name = "Preview") }
}`,
    },
  ],

  packagesToKnow: [
    { name: 'Jetpack Compose + Material 3', what: 'Declarative UI toolkit and the Material design components.', analog: 'React + MUI' },
    { name: 'Navigation Compose', what: 'In-app navigation and a typed back stack.', analog: 'React Router' },
    { name: 'ViewModel + Lifecycle', what: 'State holders that survive configuration changes.', analog: 'a store scoped to a route/screen' },
    { name: 'kotlinx.coroutines', what: 'Structured async with suspend functions and Flow.', analog: 'Promises/async-await + RxJS' },
    { name: 'Retrofit + OkHttp', what: 'Typed HTTP client and the networking layer.', analog: 'axios / fetch wrapper' },
    { name: 'kotlinx.serialization', what: 'Type-safe JSON (de)serialization.', analog: 'zod + JSON.parse' },
    { name: 'Room', what: 'SQLite ORM with compile-time-checked queries.', analog: 'Prisma / an IndexedDB wrapper' },
    { name: 'DataStore', what: 'Async key/value and typed preferences.', analog: 'localStorage' },
    { name: 'Hilt', what: 'Dependency injection wired by the compiler.', analog: 'no clean React equivalent' },
    { name: 'Coil', what: 'Image loading and caching for Compose.', analog: 'next/image-style loaders' },
  ],

  resources: [
    { label: 'developer.android.com', href: 'https://developer.android.com', kind: 'docs', note: 'The MDN of Android. Start here.' },
    { label: 'Thinking in Compose', href: 'https://developer.android.com/develop/ui/compose/mental-model', kind: 'docs', note: 'Reads like "Thinking in React". Read it first.' },
    { label: 'Android Basics with Compose', href: 'https://developer.android.com/courses/android-basics-compose/course', kind: 'course', note: 'Google’s guided path from zero.' },
    { label: 'Now in Android (sample app)', href: 'https://github.com/android/nowinandroid', kind: 'sample', note: 'A real, modern, multi-module reference codebase.' },
    { label: 'Kotlin Koans', href: 'https://play.kotlinlang.org/koans', kind: 'course', note: 'Learn the language in the browser; TS instincts carry over.' },
    { label: 'Compose pathway', href: 'https://developer.android.com/courses/pathways/compose', kind: 'course' },
    { label: 'r/androiddev', href: 'https://www.reddit.com/r/androiddev/', kind: 'community' },
  ],
};

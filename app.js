import { getJobs } from "./services/jobService.js";
import { calculateScore } from "./utils/matcher.js";

window.matchJobs = async function () {

  document.getElementById("loading").style.display = "block";

  const skills = document.getElementById("skills").value.toLowerCase().split(",");
  const experience = +document.getElementById("experience").value;

  const user = { skills, experience };

  const jobs = await getJobs();

  const results = jobs.map(job => ({
    ...job,
    score: calculateScore(user, job)
  }));

  display(results);

  document.getElementById("loading").style.display = "none";
};

function display(results) {
  const div = document.getElementById("results");
  div.innerHTML = "";

  results.forEach(j => {
    div.innerHTML += `
      <div class="card">
        <h3>${j.title}</h3>
        <p>${j.score}% match</p>
      </div>
    `;
  });
}